import { MetricsResponse } from "../../metrics/models/MetricsResponse";

export interface FindGardensByOwnerId {
  id: number;
  name: string;
  metricsResponse: MetricsResponse;
}
