package com.smartgarden.server.responses.plant;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FindPlantsByPlantFamilyIdResponse {
    private Long id;
    private String name;

    public FindPlantsByPlantFamilyIdResponse(Long id, String name) {
        this.id = id;
        this.name = name;
    }
}