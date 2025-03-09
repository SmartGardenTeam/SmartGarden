package com.smartgarden.server.repository;

import com.smartgarden.server.model.GardenPlant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GardenPlantRepository extends JpaRepository<GardenPlant,String> {
}
