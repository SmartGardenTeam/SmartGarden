package com.smartgarden.server.repository;

import com.smartgarden.server.model.Metrics;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MetricsRepository extends JpaRepository<Metrics, String> {
    Optional<Metrics> findTopByGarden_IdOrderByTimeStampDesc(Long gardenId);
    Optional<List<Metrics>> findAllMetricsByGarden_Id(Long gardenId);
}