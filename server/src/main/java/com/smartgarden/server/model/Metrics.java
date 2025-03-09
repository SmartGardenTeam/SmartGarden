package com.smartgarden.server.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "metrics")
@Getter
@Setter
public class Metrics {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private float moisture;

    @Column(name = "pH_of_water")
    private float pHOfWater;

    @Column(name = "water_temperature")
    private int waterTemperature;

    @Column(name = "air_temperature")
    private int airTemperature;

    @Column(name = "time_stamp")
    private LocalDateTime timeStamp;

    @ManyToOne
    @JoinColumn( name = "garden_id", nullable = false)
    private Garden garden;

    public Metrics(LocalDateTime timeStamp, int airTemperature, int waterTemperature, float pHOfWater, float moisture) {
        this.timeStamp = timeStamp;
        this.airTemperature = airTemperature;
        this.waterTemperature = waterTemperature;
        this.pHOfWater = pHOfWater;
        this.moisture = moisture;
    }

    public Metrics() {
    }
}