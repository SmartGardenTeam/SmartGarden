package com.smartgarden.server.dto;

import com.smartgarden.server.model.User;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class GardenDto {
    @NotBlank(message = "Name of garden must not be Blank")
    @Size(min = 3, max = 50, message = "Name must be between 3 and 50 characters")
    private String name;

    @NotBlank(message = "Location must not be blank")
    private String location;

    @NotNull(message = "Owner must not be null")
    private String owner;

    private LocalDateTime creationDate;
}
