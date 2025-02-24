package com.smartgarden.server.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "gardens")
@Getter
@Setter
public class Garden {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private LocalDateTime creationDate;

    @Column(nullable = false)
    private String location;

    @ManyToOne
    @JoinColumn( name = "owner_id", nullable = false)
    private User owner;

    public Garden(String name, String location, User owner) {
        this.name = name;
        this.location = location;
        this.owner = owner;
    }

    public Garden() {}
}
