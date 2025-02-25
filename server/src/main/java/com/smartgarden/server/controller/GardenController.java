package com.smartgarden.server.controller;

import com.smartgarden.server.dto.GardenDto;
import com.smartgarden.server.responses.Response;
import com.smartgarden.server.responses.garden.FindGardensByOwnerIdResponse;
import com.smartgarden.server.responses.garden.GardenResponse;
import com.smartgarden.server.service.GardenService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/gardens")
@RestController
public class GardenController {
    private final GardenService gardenService;

    public GardenController(GardenService gardenService) {
        this.gardenService = gardenService;
    }

    @GetMapping("/")
    public ResponseEntity<Response<Iterable<FindGardensByOwnerIdResponse>>> findGardensByOwnerId(@RequestHeader("Authorization") String authHeader) {
        return ResponseEntity.ok(gardenService.findGardensByOwnerId(authHeader));
    }

    @PostMapping("/create")
    public ResponseEntity<Response<GardenResponse>> createGarden(@Valid @RequestBody GardenDto garden) {
        return ResponseEntity.ok(gardenService.createGarden(garden));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Response<String>> deleteGarden(@PathVariable("id") String id) {
        return ResponseEntity.ok(gardenService.deleteGarden(Long.valueOf(id)));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Response<GardenResponse>> updateGarden(@PathVariable("id") String id, @Valid @RequestBody GardenDto garden) {
        return ResponseEntity.ok(gardenService.updateGarden(Long.valueOf(id), garden));
    }
}