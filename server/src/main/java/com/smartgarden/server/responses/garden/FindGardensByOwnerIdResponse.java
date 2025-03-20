package com.smartgarden.server.responses.garden;

import com.smartgarden.server.responses.metrics.MetricsResponse;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FindGardensByOwnerIdResponse {
    private long id;
    private String name;
    private MetricsResponse metricsResponse;

    public FindGardensByOwnerIdResponse(long id, String name, MetricsResponse metricsResponse) {
        this.id = id;
        this.name = name;
        this.metricsResponse = metricsResponse;
    }
}
