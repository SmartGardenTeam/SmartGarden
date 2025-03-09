package com.smartgarden.server.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "gardens")
@Getter
@Setter
public class Garden {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private LocalDateTime creationDate;

    @Column(nullable = false)
    private String location;

    @ManyToOne
    @JoinColumn( name = "owner_id", nullable = false)
    private User owner;

    @OneToMany(mappedBy = "garden", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<GardenPlant> gardenPlants;

    @OneToMany(mappedBy = "garden", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Metrics> metrics;

    public Garden(String name, String location, User owner) {
        this.name = name;
        this.location = location;
        this.owner = owner;
    }

    public Garden() {
    }
}