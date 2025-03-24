import { PlantFamilytRequest } from "../models/PlantFamilyRequest";
import { ENVIRONMENT } from "../../../environments/environment";
import { api } from "../../auth/interceptors/JwtInterceptor";
import { Response } from "../../shared/models/Response";
import { FindAllPlantFamiliesResponse } from "../models/FindAllPlantFamiliesResponse";

const API_URL = ENVIRONMENT.SERVER_URL + "plant-families/";

const PlantFamilyService = {
  findAllPlantFamilies: async function (): Promise<
    Response<Array<FindAllPlantFamiliesResponse>>
  > {
    return api.get(API_URL);
  },
  createPlantFamily: async function (
    plantFamilytRequest: PlantFamilytRequest
  ): Promise<Response<string>> {
    return api.post(API_URL + "create", plantFamilytRequest);
  },
};

export default PlantFamilyService;
