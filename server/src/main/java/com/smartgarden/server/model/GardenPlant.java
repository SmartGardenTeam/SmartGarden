package com.smartgarden.server.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(
        name = "gardens_plants",
        uniqueConstraints = @UniqueConstraint(columnNames = {"garden_id", "plant_id"})
)
@Getter
@Setter
public class GardenPlant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "plant_id", nullable = false)
    private Plant plant;

    @ManyToOne
    @JoinColumn(name = "garden_id", nullable = false)
    private Garden garden;

    @Column(nullable = false)
    private int quantity;

    public GardenPlant(Plant plant, Garden garden, int quantity) {
        this.plant = plant;
        this.garden = garden;
        this.quantity = quantity;
    }

    public GardenPlant() {
    }
}