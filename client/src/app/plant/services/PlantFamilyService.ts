import { PlantFamilytRequest } from "../models/PlantFamilyRequest";
import { ENVIRONMENT } from "../../../environments/environment";
import { api } from "../../auth/interceptors/JwtInterceptor";
import { Response } from "../../shared/models/Response";

const API_URL = ENVIRONMENT.serverUrl + "plant-families/";

const PlantFamilyService = {
  createPlantFamily: async function (
    plantFamilytRequest: PlantFamilytRequest
  ): Promise<Response<string>> {
    return api.post(API_URL + "create", plantFamilytRequest);
  },
};

export default PlantFamilyService;
