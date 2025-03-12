import { ENVIRONMENT } from "../../../environments/environment";
import { api } from "../../auth/interceptors/JwtInterceptor";
import { Response } from "../../shared/models/Response";
import { PlantModel } from "../models/PlantModel";

const API_URL = ENVIRONMENT.serverUrl + "plants/";

const PlantService = {
  findPlantByGardenId: async function (
    gardenId: string
  ): Promise<Response<PlantModel>> {
    return api.get(API_URL + "garden" + "/" + gardenId);
  },
};

export default PlantService;
