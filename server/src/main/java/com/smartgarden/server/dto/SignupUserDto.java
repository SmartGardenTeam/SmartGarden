package com.smartgarden.server.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignupUserDto {
    @NotBlank(message = "Email must not be null")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Password must not be null")
    private String password;

    @NotBlank(message = "Username must not be null")
    private String username;
}