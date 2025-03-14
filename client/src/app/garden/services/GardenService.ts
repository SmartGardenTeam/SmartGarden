import { ENVIRONMENT } from "../../../environments/environment";
import { api } from "../../auth/interceptors/JwtInterceptor";
import { Response } from "../../shared/models/Response";
import { CreateGardenRequest } from "../models/CreateGardenRequest";
import { FindGardensByOwnerId } from "../models/FindGardensByOwnerId";

const API_URL = ENVIRONMENT.serverUrl + "gardens/";

const GardenService = {
  findGardensByOwnerId: async function (): Promise<
    Response<Array<FindGardensByOwnerId>>
  > {
    return api.get(API_URL);
  },

  createGarden: async function (
    createGardenRequest: CreateGardenRequest
  ): Promise<Response<string>> {
    return api.post(API_URL + "create", createGardenRequest);
  },
};

export default GardenService;
