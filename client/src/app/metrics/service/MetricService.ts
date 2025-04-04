import { ENVIRONMENT } from "../../../environments/environment";
import { FullMetricsResponse } from "../models/FullMetricsResponse";
import { Response } from "../../shared/models/Response";
import { api } from "../../auth/interceptors/JwtInterceptor";
const API_URL = ENVIRONMENT.SERVER_URL + "metrics/";

const MetricsService = {
  getAllGardenMetrics: async function (
    gardenId: string
  ): Promise<Response<FullMetricsResponse[]>> {
    return api.get(API_URL + "AllGardenMetrics/" + gardenId);
  },
};

export default MetricsService;
