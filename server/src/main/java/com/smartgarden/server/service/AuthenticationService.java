package com.smartgarden.server.service;

import com.smartgarden.server.dto.LoginUserDto;
import com.smartgarden.server.dto.RegisterUserDto;
import com.smartgarden.server.dto.VerifyUserDto;
import com.smartgarden.server.model.User;
import com.smartgarden.server.repository.UserRepository;
import com.smartgarden.server.responses.auth.LoginResponse;
import com.smartgarden.server.responses.Response;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final EmailService emailService;
    private final JwtService jwtService;

    public AuthenticationService(UserRepository userRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, EmailService emailService, JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.emailService = emailService;
        this.jwtService = jwtService;
    }

    public Response<String> register(RegisterUserDto input){
        User user = new User(input.getUsername(), input.getEmail(), passwordEncoder.encode(input.getPassword()));
        user.setVerificationCode(generateVerificationCode());
        user.setVerificationExpiresAt(LocalDateTime.now().plusMinutes(15));
        user.setEnabled(false);
        sendVerificationEmail(user);
        userRepository.save(user);

        Response<String> response = new Response<>();
        response.setData("User successfully registered");

        return response;
    }

    public Response<LoginResponse> authenticate(LoginUserDto input) {
        Response<LoginResponse> response = new Response<>();
        User user = userRepository.findByEmail(input.getEmail()).orElse(null);

        if(user == null) {
            response.setSuccess(Boolean.FALSE);
            response.setErrors(new ArrayList<>(List.of("User not found")));

            return response;
        }

        if (!user.isEnabled()) {
            response.setSuccess(Boolean.FALSE);
            response.setErrors(new ArrayList<>(List.of("Account is not verified. Please verify your account")));

            return response;
        }

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            input.getEmail(),
                            input.getPassword()
                    )
            );
            System.out.println("Authentication successful");
        } catch (AuthenticationException e) {
            throw new RuntimeException("Authentication failed: " + e.getMessage(), e);
        }

        String jwtToken = jwtService.generateToken(user);

        LoginResponse loginResponse = new LoginResponse(jwtToken, jwtService.getJwtExpirationTime());
        response.setData(loginResponse);

        return response;
    }

    public Response<String> verifyUser(VerifyUserDto input){
        Response<String> response = new Response<>();
        Optional<User> optionalUser = userRepository.findByEmail(input.getEmail());

        if(optionalUser.isPresent()) {
            User user = optionalUser.get();

            if(user.isEnabled()) {
                response.setSuccess(Boolean.FALSE);
                response.setErrors(new ArrayList<>(List.of("User already verified")));

                return response;
            }

            if (user.getVerificationExpiresAt().isBefore(LocalDateTime.now())) {
                response.setSuccess(Boolean.FALSE);
                response.setErrors(new ArrayList<>(List.of("Verification code has expired")));

                return response;
            }

            if (user.getVerificationCode().equals(input.getVerificationCode())) {
                user.setEnabled(true);
                user.setVerificationCode(null);
                user.setVerificationExpiresAt(null);
                userRepository.save(user);
                response.setErrors(new ArrayList<>(List.of("User successfully verified")));

                return response;
            }
            else {
                response.setErrors(new ArrayList<>(List.of("Invalid verification code")));

                return response;
            }
        }
        else {
            response.setSuccess(Boolean.FALSE);
            response.setErrors(new ArrayList<>(List.of("User not found")));

            return response;
        }
    }

    public Response<String> resendVerificationEmail(String email){
        Response<String> response = new Response<>();
        Optional <User> optionalUser = userRepository.findByEmail(email);
        User user = optionalUser.get();

        if(user.isEnabled())
        {
            response.setSuccess(Boolean.FALSE);
            response.setErrors(new ArrayList<>(List.of("Account already verified")));
        }

        user.setVerificationCode(generateVerificationCode());
        user.setVerificationExpiresAt(LocalDateTime.now().plusMinutes(15));
        sendVerificationEmail(user);
        userRepository.save(user);

        response.setData("Verification email successfully resent");
        return response;
    }

    public void sendVerificationEmail(User user){
        String subject = "Account verification";
        String verificationCode = user.getVerificationCode();
        String htmlMessage = "<html>"
                + "<body style=\"font-family: Arial, sans-serif;\">"
                + "<div style=\"background-color: #f5f5f5; padding: 20px;\">"
                + "<h2 style=\"color: #333;\">Welcome to our app!</h2>"
                + "<p style=\"font-size: 16px;\">Please enter the verification code below to continue:</p>"
                + "<div style=\"background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0,0,0,0.1);\">"
                + "<h3 style=\"color: #333;\">Verification Code:</h3>"
                + "<p style=\"font-size: 18px; font-weight: bold; color: #007bff;\">" + verificationCode + "</p>"
                + "</div>"
                + "</div>"
                + "</body>"
                + "</html>";

        emailService.sendVerificationEmail(user.getEmail(), subject, htmlMessage);
    }

    private String generateVerificationCode(){
        Random random = new Random();
        int code = random.nextInt(900000) + 100000;
        return String.valueOf(code);
    }
}