package com.smartgarden.server.service;

import com.smartgarden.server.dto.GardenDto;
import com.smartgarden.server.model.Garden;
import com.smartgarden.server.model.User;
import com.smartgarden.server.repository.GardenRepository;
import com.smartgarden.server.repository.UserRepository;
import com.smartgarden.server.responses.Response;
import com.smartgarden.server.responses.garden.FindGardensByOwnerIdResponse;
import com.smartgarden.server.responses.garden.GardenResponse;
import com.smartgarden.server.responses.garden.OwnerResponse;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class GardenService {
    private final GardenRepository gardenRepository;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    public GardenService(GardenRepository gardenRepository, UserRepository userRepository, JwtService jwtService) {
        this.gardenRepository = gardenRepository;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    public Response<Iterable<FindGardensByOwnerIdResponse>> findGardensByOwnerId(String authHeader) {
        Response<Iterable<FindGardensByOwnerIdResponse>> response = new Response<>();

        String token = authHeader.replace("Bearer ", "");
        User owner = (userRepository.findByUsername(jwtService.extractUsername(token)).orElse(null));

        if(owner == null) {
            response.setErrors(new ArrayList<>(List.of("user does not exist")));
            response.setSuccess(false);

            return response;
        }

        List<Garden> gardensList = gardenRepository.findByOwnerId(owner.getId()).orElse(Collections.emptyList());

        Iterable<FindGardensByOwnerIdResponse> gardens = gardensList.stream()
                .map(garden -> new FindGardensByOwnerIdResponse(garden.getId(),garden.getName(),garden.getLocation(), new OwnerResponse(owner.getId(), owner.getUsername(), owner.getEmail()), garden.getCreationDate()))
                .collect(Collectors.toList());
        response.setData(gardens);

        return response;
    }

    public Response<GardenResponse> createGarden(GardenDto gardendto) {
        User user = userRepository.findByUsername(gardendto.getOwner()).orElse(null);
        Response<GardenResponse> response = new Response<>();

        if(user == null) {
           response.setErrors(new ArrayList<>(List.of("t")));
           response.setSuccess(false);

           return response;
        }

        Garden garden = new Garden(gardendto.getName(), gardendto.getLocation(), user);
        garden.setCreationDate(LocalDateTime.now());
        gardenRepository.save(garden);

        response.setData(new GardenResponse(garden.getId(), "Garden created successfully"));

        return response;
    }

    @Transactional
    public Response<String> deleteGarden(Long gardenId) {
        Garden garden = gardenRepository.findById(gardenId).orElse(null);
        Response<String> response = new Response<>();

        if(garden == null) {
            response.setSuccess(false);
            response.setErrors(new ArrayList<>(List.of("Garden does not exist")));

            return response;
        }

        User owner = garden.getOwner();

        if(owner == null) {
            response.setSuccess(false);
            response.setErrors(new ArrayList<>(List.of("Owner of the garden does not exist")));

            return response;
        }

        owner.getGardens().remove(garden);
        userRepository.save(owner);
        gardenRepository.delete(garden);
        response.setData("Garden deleted successfully");

        return response;
    }

    public Response<GardenResponse> updateGarden(Long id, GardenDto gardendto) {
        Garden garden = gardenRepository.findById(id).orElse(null);
        Response<GardenResponse> response = new Response<>();

        if(garden == null) {
            response.setSuccess(false);
            response.setErrors(new ArrayList<>(List.of("Garden does not exist")));

            return response;
        }

        garden.setName(gardendto.getName());
        garden.setLocation(gardendto.getLocation());

        gardenRepository.save(garden);
        response.setData(new GardenResponse(garden.getId(), "Garden updated successfully"));

        return response;
    }
}