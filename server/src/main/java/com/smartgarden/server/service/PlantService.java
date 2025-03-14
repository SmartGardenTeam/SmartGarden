package com.smartgarden.server.service;

import com.smartgarden.server.model.Plant;
import com.smartgarden.server.repository.PlantRepository;
import com.smartgarden.server.responses.Response;
import com.smartgarden.server.responses.plant.FindPlantsByPlantFamilyIdResponse;
import org.springframework.stereotype.Service;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PlantService {
    private final PlantRepository plantRepository;

    public PlantService(PlantRepository plantRepository) {
        this.plantRepository = plantRepository;
    }

    public Response<Iterable<FindPlantsByPlantFamilyIdResponse>> findPlantsByPlantFamilyId(Long plantFamilyId) {
        Response<Iterable<FindPlantsByPlantFamilyIdResponse>> response = new Response<>();

        List<Plant> plantList = plantRepository.findAllByPlantFamilyId(plantFamilyId).orElse(Collections.emptyList());

        Iterable<FindPlantsByPlantFamilyIdResponse> plants = plantList.stream()
                .map(plant -> new FindPlantsByPlantFamilyIdResponse(plant.getId(),plant.getName()))
                .collect(Collectors.toList());
        response.setData(plants);

        return response;
    }
}