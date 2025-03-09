package com.smartgarden.server.repository;

import com.smartgarden.server.model.Plant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlantRepository extends JpaRepository<Plant,String> {
}
