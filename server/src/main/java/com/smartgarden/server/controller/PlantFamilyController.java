package com.smartgarden.server.controller;

import com.smartgarden.server.dto.PlantFamilyDto;
import com.smartgarden.server.responses.Response;
import com.smartgarden.server.responses.plantFamily.FindAllPlantFamiliesResponse;
import com.smartgarden.server.service.PlantFamilyService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/plant-families")
@RestController
public class PlantFamilyController {
    private final PlantFamilyService plantFamilyService;

    public PlantFamilyController(PlantFamilyService plantFamilyService) {
        this.plantFamilyService = plantFamilyService;
    }

    @GetMapping("/")
    public ResponseEntity<Response<Iterable<FindAllPlantFamiliesResponse>>> findAllPlantFamilies() {
        return ResponseEntity.ok(plantFamilyService.findAllPlantFamilies());
    }

    @PostMapping("/create")
    public ResponseEntity<Response<String>> createPlantFamily(@Valid @RequestBody PlantFamilyDto plantFamily) {
        return ResponseEntity.ok(plantFamilyService.createPlantFamily(plantFamily));
    }
}