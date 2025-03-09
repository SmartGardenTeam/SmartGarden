import { ENVIRONMENT } from "../../../environments/environment";
import { api } from "../../auth/interceptors/JwtInterceptor";
import { Response } from "../../shared/models/Response";

const API_URL = ENVIRONMENT.serverUrl + "gardens/";

const GardenService = {
  findGardensByOwnerId: async function (): Promise<Response<string>> {
    return api.get(API_URL);
  },

  createGarden: async function (): Promise<Response<string>> {
    return api.get(API_URL + "create");
  },
};

export default GardenService;
