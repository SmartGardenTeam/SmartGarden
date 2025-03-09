package com.smartgarden.server.service;

import com.smartgarden.server.repository.MetricsRepository;
import org.springframework.stereotype.Service;

@Service
public class MetricsService {
    private final MetricsRepository metricsRepository;

    public MetricsService(MetricsRepository metricsRepository) {
        this.metricsRepository = metricsRepository;
    }
}