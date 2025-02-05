package com.smartgarden.server.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginUserDto {
    @NotBlank(message = "Email must not be null")
    private String email;

    @NotBlank(message = "Passsword must not be null")
    private String password;
}