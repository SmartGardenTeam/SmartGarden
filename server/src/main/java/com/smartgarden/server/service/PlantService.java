package com.smartgarden.server.service;

import com.smartgarden.server.model.Plant;
import com.smartgarden.server.repository.PlantRepository;
import com.smartgarden.server.responses.Response;
import com.smartgarden.server.responses.plant.PlantResponse;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PlantService {
    private final PlantRepository plantRepository;

    public PlantService(PlantRepository plantRepository) {
        this.plantRepository = plantRepository;
    }

    @Transactional
    public Response<List<PlantResponse>> findAllPlants() {
        Response<List<PlantResponse>> response = new Response<>();
        List<Plant> plants = plantRepository.findAll();

        List<PlantResponse> plantsResponses = plants.stream()
                .map(plant -> new PlantResponse(plant.getPlantFamily().getName(),plant.getName(), plant.getDescription(), plant.getTips(), plant.getHarvestMethod(), plant.getFirstHarvest(), plant.getFinalHarvest(), plant.getGrowingSeason(), plant.getAverageMonthlyYield()))
                .collect(Collectors.toList());
        response.setData(plantsResponses);

        return response;
    }

    @Transactional
    public Response<PlantResponse> findPlantsByGardenId(String id) {
        Response<PlantResponse> response = new Response<>();
        Plant plant = plantRepository.findByGardenId(Long.parseLong(id)).orElse(null);

        if (plant == null) {
            response.setErrors(new ArrayList<>(List.of("There is no plant for garden with id " + id)));
            response.setSuccess(false);

            return response;
        }

        response.setData(new PlantResponse(plant.getPlantFamily().getName(), plant.getName(), plant.getDescription(), plant.getTips(), plant.getHarvestMethod(), plant.getFirstHarvest(), plant.getFinalHarvest(), plant.getGrowingSeason(), plant.getAverageMonthlyYield()));

        return response;
    }
}