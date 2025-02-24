package com.smartgarden.server.responses.garden;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GardenResponse {
    private Long Id;
    private String message;

    public GardenResponse(Long id, String message) {
        this.Id = id;
        this.message = message;

    }
}