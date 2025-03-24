import { ENVIRONMENT } from "../../../environments/environment";
import { api } from "../../auth/interceptors/JwtInterceptor";
import { Response } from "../../shared/models/Response";
import { PlantModel } from "../models/PlantModel";
import { FindAllPlantsByPlantFamilyIdResponse } from "../interfaces/FindPlantsByPlantFamilyIdResponse";

const API_URL = ENVIRONMENT.SERVER_URL + "plants/";

const PlantService = {
  findPlantByGardenId: async function (
    gardenId: string
  ): Promise<Response<PlantModel>> {
    return api.get(API_URL + "garden" + "/" + gardenId);
  },
  findPlantsByPlantFamilyId: async function (
    id: number
  ): Promise<Response<Array<FindAllPlantsByPlantFamilyIdResponse>>> {
    return api.get(`${API_URL}${id}`);
  },
};

export default PlantService;
