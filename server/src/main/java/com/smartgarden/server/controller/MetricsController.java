package com.smartgarden.server.controller;

import com.smartgarden.server.responses.Response;
import com.smartgarden.server.responses.metrics.FullMetricResponse;
import com.smartgarden.server.service.MetricsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("/metrics")
@RestController
public class MetricsController {
    private final MetricsService metricsService;

    @GetMapping("/AllGardenMetrics/{id}")
    public ResponseEntity <Response<List<FullMetricResponse>>> getAllGardenMetrics(@PathVariable Long id) {
        return ResponseEntity.ok(metricsService.findAllGardenMetrics(id));
    }

    public MetricsController(MetricsService metricsService) {
        this.metricsService = metricsService;
    }
}