package com.smartgarden.server.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "plants", uniqueConstraints = {@UniqueConstraint(columnNames = "name")})
@Getter
@Setter
public class Plant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "TEXT")
    private String tips;

    @Column(name = "harvest_method")
    private String harvestMethod;

    @Column(name = "first_harvest")
    private String firstHarvest;

    @Column(name = "final_harvest")
    private String finalHarvest;

    @Column(name = "growing_season")
    private String growingSeason;

    @Column(name = "average_montly_yield")
    private String averageMonthlyYield;

    @ManyToOne
    @JoinColumn(name = "plant_family_id", nullable = false)
    private PlantFamily plantFamily;

    @OneToMany(mappedBy = "plant", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<GardenPlant> gardenPlants;

    public Plant(PlantFamily plantFamily, String name, String description, String tips, String harvestMethod, String firstHarvest, String finalHarvest, String growingSeason, String averageMonthlyYield) {
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

    public Plant() {
    }
}