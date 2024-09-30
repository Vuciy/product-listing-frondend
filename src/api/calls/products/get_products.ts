import { objectToQueryString } from "../../../helpers/object_to_query_string";
import { API } from "../../api";

export interface IGetProductsRequest {
  size?: number;
  page?: number;
  search?: string;
}

export const get_products = async (request: IGetProductsRequest) => {
  return await new API().apiGet({
    baseUrl: process.env.REACT_APP_API_URL ?? "",
    endpoint: `products${objectToQueryString(request)}`,
  });
};
