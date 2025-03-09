package com.smartgarden.server.repository;

import com.smartgarden.server.model.PlantFamily;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlantFamilyRepository extends JpaRepository<PlantFamily, Long> {
}
