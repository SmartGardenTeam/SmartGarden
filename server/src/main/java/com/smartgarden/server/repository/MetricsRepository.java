package com.smartgarden.server.repository;

import com.smartgarden.server.model.Metrics;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MetricsRepository extends JpaRepository<Metrics, String> {
}
