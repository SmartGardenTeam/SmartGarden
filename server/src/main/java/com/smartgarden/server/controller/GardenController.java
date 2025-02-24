package com.smartgarden.server.controller;

import com.smartgarden.server.dto.GardenDto;
import com.smartgarden.server.responses.Response;
import com.smartgarden.server.responses.garden.FindOwnersGardensResponse;
import com.smartgarden.server.responses.garden.GardenResponse;
import com.smartgarden.server.service.GardenService;
import com.smartgarden.server.service.JwtService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/gardens")
@RestController
public class GardenController {
    private final GardenService gardenService;

    public GardenController(GardenService gardenService, JwtService jwtService) {
        this.gardenService = gardenService;
    }

    @GetMapping("/")
    public ResponseEntity<Response<Iterable<FindOwnersGardensResponse>>> findOwnersGardens(@RequestHeader("Authorization") String authHeader) {
        return ResponseEntity.ok(gardenService.findOwnersGardens(authHeader));
    }

    @PostMapping("/add")
    public ResponseEntity<Response<GardenResponse>> addGarden(@Valid @RequestBody GardenDto garden) {
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
