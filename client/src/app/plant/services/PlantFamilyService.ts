import { PlantFamilytRequest } from "../models/PlantFamilyRequest";
import { ENVIRONMENT } from "../../../environments/environment";
import { api } from "../../auth/interceptors/JwtInterceptor";
import { Response } from "../../shared/models/Response";
import { PlantModel } from "../models/PlantModel";

const API_URL = ENVIRONMENT.serverUrl + "plant-families/";

const PlantFamilyService = {
  createPlantFamily: async function (
    plantFamilytRequest: PlantFamilytRequest
  ): Promise<Response<string>> {
    return api.post(API_URL + "create", plantFamilytRequest);
  },

  findPlantByGardenId: async function (
    gardenId: string
  ): Promise<Response<PlantModel>> {
    return api.get(API_URL + "garden" + gardenId);
  },
};

export default PlantFamilyService;
