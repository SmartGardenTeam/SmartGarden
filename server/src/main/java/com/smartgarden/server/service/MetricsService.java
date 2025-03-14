package com.smartgarden.server.service;

import com.smartgarden.server.responses.metrics.MetricsResponse;
import com.smartgarden.server.model.Metrics;
import com.smartgarden.server.repository.MetricsRepository;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class MetricsService {
    private final MetricsRepository metricsRepository;

    public MetricsService(MetricsRepository metricsRepository) {
        this.metricsRepository = metricsRepository;
    }

    public MetricsResponse findGardenMetrics(Long gardenId) {
        Optional<Metrics> metrics = metricsRepository.findTopByGarden_IdOrderByTimeStampDesc(gardenId);

        return metrics.map(value -> new MetricsResponse(value.getMoisture(), value.getPHOfWater(), value.getAirTemperature())).orElse(null);
    }
}