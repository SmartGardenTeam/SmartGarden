package com.smartgarden.server.responses.metrics;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class FullMetricResponse {
    private float moisture;
    private float pHOfWater;
    private int airTemperature;
    private LocalDateTime timestamp;
    private float waterTemperature;

    public FullMetricResponse(float moisture, float pHOfWater, int airTemperature, LocalDateTime timestamp, float waterTemperature) {
        this.moisture = moisture;
        this.pHOfWater = pHOfWater;
        this.airTemperature = airTemperature;
        this.timestamp = timestamp;
        this.waterTemperature = waterTemperature;
    }
}
