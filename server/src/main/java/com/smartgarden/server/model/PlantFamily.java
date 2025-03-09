package com.smartgarden.server.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "plant_families",  uniqueConstraints = {@UniqueConstraint(columnNames = "name")})
@Getter
@Setter
public class PlantFamily {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String name;

    @OneToMany(mappedBy = "plantFamily", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Plant> plants;

    public PlantFamily(String name) {
        this.name = name;
    }

    public PlantFamily() {
    }
}