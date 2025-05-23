package com.smartgarden.server.controller;

import com.smartgarden.server.dto.CreateGardenDto;
import com.smartgarden.server.dto.GardenDto;
import com.smartgarden.server.responses.Response;
import com.smartgarden.server.responses.garden.FindGardenByIdResponse;
import com.smartgarden.server.responses.garden.FindGardensByOwnerIdResponse;
import com.smartgarden.server.responses.garden.GardenResponse;
import com.smartgarden.server.service.GardenService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.CompletableFuture;

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

    @GetMapping("/{id}")
    public ResponseEntity<Response<FindGardenByIdResponse>> findGardenById(@RequestHeader("Authorization") String authHeader, @PathVariable("id") String id) {
        return ResponseEntity.ok(gardenService.findGardenById(authHeader, id));
    }

    @PostMapping("/create")
    public ResponseEntity<Response<GardenResponse>> createGarden(@Valid @RequestBody CreateGardenDto createGardenDto, @RequestHeader("Authorization") String authHeader) {
        return ResponseEntity.ok(gardenService.createGarden(createGardenDto, authHeader));
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