import { City } from "@/utils";
import { AxiosResponse } from "axios";
import { axiosInstance } from "./axios";

export function searchCity(search: string): Promise<City[]> {
  return axiosInstance
    .get(
      `/communes?nom=${search}&fields=departement&boost=population&limit=5`,
      { baseURL: "https://geo.api.gouv.fr", withCredentials: false }
    )
    .then((response: AxiosResponse<City[]>) => response.data);
}
