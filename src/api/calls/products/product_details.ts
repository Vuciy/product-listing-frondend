import { objectToQueryString } from "../../../helpers/object_to_query_string";
import { API } from "../../api";

export interface IProductDetailsRequest {
  id: string | number;
}

export const product_details = async (id: string | number) => {
  return await new API().apiGet({
    baseUrl: process.env.REACT_APP_API_URL ?? "",
    endpoint: `product/${id}`,
  });
};
