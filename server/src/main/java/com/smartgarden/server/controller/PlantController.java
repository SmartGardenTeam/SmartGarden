package com.smartgarden.server.controller;

import com.smartgarden.server.responses.Response;
import com.smartgarden.server.responses.plant.PlantResponse;
import com.smartgarden.server.service.PlantService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("/plants")
@RestController
public class PlantController {
    private final PlantService plantService;

    public PlantController(PlantService plantService) {
        this.plantService = plantService;
    }

    @GetMapping("/")
    public ResponseEntity<Response<List<PlantResponse>>> getAllPlants() {
        return ResponseEntity.ok(plantService.findAllPlants());
    }

    @GetMapping("/garden/{id}")
    public ResponseEntity<Response<PlantResponse>> getPlantsByGardenId(@PathVariable String id) {
        return ResponseEntity.ok(plantService.findPlantByGardenId(id));
    }
}