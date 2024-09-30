import axios from "axios";

interface IApiReqeust {
  endpoint: string;
  baseUrl: string;
  content?: any;
  contentType?: string;
  authorization?: string | boolean;
  customHeaders?: ICustomHeaders;
}

interface ICustomHeaders {
  [key: string]: string;
}

interface IGetHeaders {
  authorization?: string | boolean;
  customHeaders?: ICustomHeaders;
  contentType?: string;
}

interface IApiResponse {
  success: boolean;
  message?: string;
  content?: any;
}

export class API {
  bearerToken = process.env.LETS_TRADE_ROOT_TOKEN;

  public async apiGet({
    baseUrl,
    endpoint,
    contentType,
    authorization,
    customHeaders,
  }: IApiReqeust) {
    return await axios({
      method: "GET",
      url: `${baseUrl}/${endpoint}`,
      headers: this.getHeaders({ authorization, contentType, customHeaders }),
    })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return this.extractErrorMessage(error);
      });
  }

  public async apiPost({
    baseUrl,
    endpoint,
    contentType,
    content,
    authorization,
    customHeaders,
  }: IApiReqeust) {
    return await axios({
      method: "POST",
      url: `${baseUrl}/${endpoint}`,
      headers: this.getHeaders({ authorization, contentType, customHeaders }),
      data: content,
    })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return this.extractErrorMessage(error);
      });
  }

  public async apiPut({
    baseUrl,
    endpoint,
    contentType,
    content,
    authorization,
    customHeaders,
  }: IApiReqeust) {
    return await axios({
      method: "PUT",
      url: `${baseUrl}/${endpoint}`,
      headers: this.getHeaders({ authorization, contentType, customHeaders }),
      data: content,
    })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return this.extractErrorMessage(error);
      });
  }

  public async apiDelete({
    baseUrl,
    endpoint,
    contentType,
    content,
    authorization,
    customHeaders,
  }: IApiReqeust) {
    return await axios({
      method: "DELETE",
      url: `${baseUrl}/${endpoint}`,
      headers: this.getHeaders({ authorization, contentType, customHeaders }),
      data: content,
    })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(`api -> apiDelete -> calls -> ${endpoint} ERROR:`, error);
        return this.extractErrorMessage(error);
      });
  }

  private getHeaders(params: IGetHeaders) {
    let objHeaders: any = {};
    objHeaders["content-type"] = params.contentType ?? "application/json";

    if (params.authorization) {
      objHeaders.authorization = `Bearer ${
        params.authorization ?? this.bearerToken
      }`;
    }

    if (params.customHeaders) {
      objHeaders = { ...objHeaders, ...params.customHeaders };
    }

    return objHeaders;
  }

  private extractErrorMessage(error: any): IApiResponse {
    let message = "Something went wrong";

    if (error?.response?.data?.message) {
      message = error?.response?.data?.message;
    } else if (error?.message) {
      message = error?.message;
    }

    //Simulate a normal response so that it wont break the UI.
    return {
      success: false,
      message: message,
      content: error,
    };
  }
}
