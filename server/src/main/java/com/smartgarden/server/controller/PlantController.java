package com.smartgarden.server.controller;
import com.smartgarden.server.responses.Response;
import com.smartgarden.server.responses.plant.FindPlantsByPlantFamilyIdResponse;
import com.smartgarden.server.service.PlantService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/plants")
@RestController
public class PlantController {
    private final PlantService plantService;

    public PlantController(PlantService plantService) {
        this.plantService = plantService;
    }

    @GetMapping("/{plantFamilyId}")
    public ResponseEntity<Response<Iterable<FindPlantsByPlantFamilyIdResponse>>> findPlantsByPlantFamilyId(
            @PathVariable("plantFamilyId") String plantFamilyId) {
        return ResponseEntity.ok(plantService.findPlantsByPlantFamilyId(Long.valueOf(plantFamilyId))
        );
    }
}