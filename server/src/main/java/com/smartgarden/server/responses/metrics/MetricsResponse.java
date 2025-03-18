package com.smartgarden.server.responses.metrics;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MetricsResponse {
    private float moisture;
    private float pHOfWater;
    private int airTemperature;

    public MetricsResponse(float moisture, float pHOfWater, int airTemperature) {
        this.moisture = moisture;
        this.pHOfWater = pHOfWater;
        this.airTemperature = airTemperature;
    }
}