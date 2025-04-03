package com.smartgarden.server.service;

import com.smartgarden.server.responses.Response;
import com.smartgarden.server.responses.metrics.FullMetricResponse;
import com.smartgarden.server.responses.metrics.MetricsResponse;
import com.smartgarden.server.model.Metrics;
import com.smartgarden.server.repository.MetricsRepository;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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

    public Response<List<FullMetricResponse>> findAllGardenMetrics(Long gardenId) {
        Response<List<FullMetricResponse>> response = new Response<>();
        List<Metrics> metrics = metricsRepository.findAllMetricsByGarden_Id(gardenId).orElse(Collections.emptyList());

        List<FullMetricResponse>  metricResponses = metrics.stream()
                .map(metric -> new FullMetricResponse(metric.getMoisture(), metric.getPHOfWater(), metric.getAirTemperature(), metric.getTimeStamp(), metric.getWaterTemperature()))
                .collect(Collectors.toList());
        response.setData(metricResponses);

        return response;
    }

}