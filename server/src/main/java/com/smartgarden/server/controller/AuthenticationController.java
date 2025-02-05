package com.smartgarden.server.controller;

import com.smartgarden.server.dto.LoginUserDto;
import com.smartgarden.server.dto.RegisterUserDto;
import com.smartgarden.server.dto.VerifyUserDto;
import com.smartgarden.server.responses.auth.LoginResponse;
import com.smartgarden.server.responses.Response;
import com.smartgarden.server.service.AuthenticationService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    private AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/register")
    public ResponseEntity<Response<String>> register(@Valid @RequestBody RegisterUserDto registerUserDto) {
        return ResponseEntity.ok(authenticationService.register(registerUserDto));
    }

    @PostMapping("/login")
    public ResponseEntity<Response<LoginResponse>> authenticate(@Valid @RequestBody LoginUserDto loginUserDto) {
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
}