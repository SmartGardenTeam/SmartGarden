package com.smartgarden.server.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VerifyUserDto {
    @NotBlank(message = "Email must not be null")
    private String email;

    @NotBlank(message = "Verification code must not be null")
    private String verificationCode;
}