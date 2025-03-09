package com.smartgarden.server.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class PlantFamilyDto {
    @NotBlank(message = "Name of plant family must not be Blank")
    @Size(min = 3, max = 50, message = "Name must be between 3 and 50 characters")
    private String name;
}
