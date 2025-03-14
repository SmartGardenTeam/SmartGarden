package com.smartgarden.server.service;

import com.smartgarden.server.model.GardenPlant;
import com.smartgarden.server.repository.GardenPlantRepository;
import org.springframework.stereotype.Service;

@Service
public class GardenPlantService {
    private final GardenPlantRepository gardenPlantRepository;

    public GardenPlantService(GardenPlantRepository gardenPlantRepository) {
        this.gardenPlantRepository = gardenPlantRepository;
    }

    public void createGardenPlant(GardenPlant gardenPlant) {
        gardenPlantRepository.save(gardenPlant);
    }
}