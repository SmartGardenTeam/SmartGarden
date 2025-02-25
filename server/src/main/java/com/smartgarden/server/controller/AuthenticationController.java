package com.smartgarden.server.controller;

import com.smartgarden.server.dto.LoginUserDto;
import com.smartgarden.server.dto.SignupUserDto;
import com.smartgarden.server.dto.VerifyUserDto;
import com.smartgarden.server.responses.auth.AuthenticationResponse;
import com.smartgarden.server.responses.Response;
import com.smartgarden.server.service.AuthenticationService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    private AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/signup")
    public ResponseEntity<Response<String>> signup(@Valid @RequestBody SignupUserDto signupUserDto) {
        return ResponseEntity.ok(authenticationService.signup(signupUserDto));
    }

    @PostMapping("/login")
    public ResponseEntity<Response<AuthenticationResponse>> authenticate(@Valid @RequestBody LoginUserDto loginUserDto) {
        return ResponseEntity.ok(authenticationService.authenticate(loginUserDto));
    }

    @PostMapping("/verify")
    public ResponseEntity<Response<String>> verifyUser(@Valid @RequestBody VerifyUserDto verifyUserDto) {
        return ResponseEntity.ok(authenticationService.verifyUser(verifyUserDto));
    }

    @PostMapping("/resend")
    public ResponseEntity<Response<String>> resendVerificationEmail(@RequestParam String email) {
        return ResponseEntity.ok(authenticationService.resendVerificationEmail(email));
    }

    @PostMapping("/refresh-token")
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
       authenticationService.refreshToken(request, response);
    }
}