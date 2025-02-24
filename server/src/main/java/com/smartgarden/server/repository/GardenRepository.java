package com.smartgarden.server.repository;

import com.smartgarden.server.model.Garden;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface GardenRepository extends CrudRepository<Garden, Long> {
    Optional<List<Garden>> findByOwnerId(Long ownerId);
}
