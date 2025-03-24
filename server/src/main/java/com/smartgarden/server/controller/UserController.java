package com.smartgarden.server.controller;

import com.smartgarden.server.responses.Response;
import com.smartgarden.server.responses.user.AuthenticatedUserResponse;
import com.smartgarden.server.responses.user.UserResponse;
import com.smartgarden.server.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/users")
@RestController
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public ResponseEntity<Response<AuthenticatedUserResponse>> authenticateUser() {
        return ResponseEntity.ok(userService.authenticateUser());
    }

    @GetMapping("/")
    public ResponseEntity<Response<Iterable<UserResponse>>> findAllUsers() {
        return ResponseEntity.ok(userService.findAllUsers());
    }
}