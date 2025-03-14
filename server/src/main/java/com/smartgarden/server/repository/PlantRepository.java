package com.smartgarden.server.repository;

import com.smartgarden.server.model.Plant;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface PlantRepository extends JpaRepository<Plant,String> {
    Optional<List<Plant>> findAllByPlantFamilyId(Long plantFamilyId);
}