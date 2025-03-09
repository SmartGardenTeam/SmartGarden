package com.smartgarden.server.responses.plantFamily;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FindAllPlantFamiliesResponse {
    private Long id;
    private String name;

    public FindAllPlantFamiliesResponse(Long id, String name) {
        this.id = id;
        this.name = name;
    }
}