package com.smartgarden.server.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PasswordDto {
    @NotBlank(message = "Passsword must not be null")
    String password;
}
