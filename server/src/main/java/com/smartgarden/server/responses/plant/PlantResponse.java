package com.smartgarden.server.responses.plant;

import com.smartgarden.server.model.PlantFamily;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PlantResponse {
    private String name;
    private String description;
    private String tips;
    private String harvestMethod;
    private String firstHarvest;
    private String finalHarvest;
    private String growingSeason;
    private String averageMonthlyYield;
    private String plantFamily;

    public PlantResponse(String plantFamily, String name, String description, String tips, String harvestMethod, String firstHarvest, String finalHarvest, String growingSeason, String averageMonthlyYield) {
        this.plantFamily = plantFamily;
        this.name = name;
        this.description = description;
        this.tips = tips;
        this.harvestMethod = harvestMethod;
        this.firstHarvest = firstHarvest;
        this.finalHarvest = finalHarvest;
        this.growingSeason = growingSeason;
        this.averageMonthlyYield = averageMonthlyYield;
    }

}
