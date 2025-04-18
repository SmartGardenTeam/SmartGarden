import { ENVIRONMENT } from "../../../environments/environment";
import { api } from "../../auth/interceptors/JwtInterceptor";
import { Response } from "../../shared/models/Response";
import { CreateGardenRequest } from "../models/CreateGardenRequest";
import { FindGardensByOwnerId } from "../models/FindGardensByOwnerId";
import { GardenModel } from "../models/GardenModel";

const API_URL = ENVIRONMENT.SERVER_URL + "gardens/";

const GardenService = {
  findGardensByOwnerId: async function (): Promise<
    Response<Array<FindGardensByOwnerId>>
  > {
    return api.get(API_URL);
  },

  findGardenById: async function (
    gardenId: string
  ): Promise<Response<GardenModel>> {
    return api.get(API_URL + gardenId);
  },

  createGarden: async function (
    createGardenRequest: CreateGardenRequest
  ): Promise<Response<string>> {
    return api.post(API_URL + "create", createGardenRequest);
  },
};

export default GardenService;
