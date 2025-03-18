package com.smartgarden.server.service;

import com.smartgarden.server.dto.PlantFamilyDto;
import com.smartgarden.server.model.PlantFamily;
import com.smartgarden.server.repository.PlantFamilyRepository;
import com.smartgarden.server.responses.Response;
import com.smartgarden.server.responses.plantFamily.FindAllPlantFamiliesResponse;
import org.springframework.stereotype.Service;
import java.util.stream.Collectors;


@Service
public class PlantFamilyService {
    private final PlantFamilyRepository plantFamilyRepository;

    public PlantFamilyService(PlantFamilyRepository repository) {
        this.plantFamilyRepository = repository;
    }

    public Response<String> createPlantFamily(PlantFamilyDto plantFamilyDto) {
        Response<String> response = new Response<>();
        PlantFamily plantFamily = new PlantFamily(plantFamilyDto.getName());

        plantFamilyRepository.save(plantFamily);
        response.setData("Plant family created successfully");

        return response;
    }

    public Response<Iterable<FindAllPlantFamiliesResponse>> findAllPlantFamilies() {
        Response<Iterable<FindAllPlantFamiliesResponse>> response = new Response<>();

        Iterable<FindAllPlantFamiliesResponse> plantFamilies = plantFamilyRepository.findAll().stream()
                .map(plantFamily -> new FindAllPlantFamiliesResponse(plantFamily.getId(), plantFamily.getName()))
                .collect(Collectors.toList());
        response.setData(plantFamilies);

        return response;
    }
}