import { ENVIRONMENT } from "../../../environments/environment";
import { api } from "../../auth/interceptors/JwtInterceptor";
import { Response } from "../../shared/models/Response";
import { FindAllPlantsByPlantFamilyIdResponse } from "../interfaces/FindPlantsByPlantFamilyIdResponse";

const API_URL = ENVIRONMENT.serverUrl + "plants/";

const PlantService = {
  findPlantsByPlantFamilyId: async function (
    id: number
  ): Promise<Response<Array<FindAllPlantsByPlantFamilyIdResponse>>> {
    return api.get(`${API_URL}${id}`);
  },
};

export default PlantService;
