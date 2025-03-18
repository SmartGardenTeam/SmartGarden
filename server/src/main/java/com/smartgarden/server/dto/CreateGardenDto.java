package com.smartgarden.server.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateGardenDto {
    @NotBlank(message = "Name of garden must not be Blank")
    @Size(min = 3, max = 20, message = "Name must be between 3 and 20 characters")
    private String name;

    @NotBlank(message = "Location must not be blank")
    private String location;

    private Long plantId;

    private int quantity;
}