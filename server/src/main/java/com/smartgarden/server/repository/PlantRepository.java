package com.smartgarden.server.repository;

import com.smartgarden.server.model.Plant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface PlantRepository extends JpaRepository<Plant,String> {
    @Query("SELECT p FROM Plant p JOIN GardenPlant gp ON p.id = gp.plant.id WHERE gp.garden.id = :gardenId")
    Optional<Plant> findByGardenId(@Param("gardenId") Long gardenId);
}
