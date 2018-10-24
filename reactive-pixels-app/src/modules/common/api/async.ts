import axios, { AxiosRequestConfig } from "axios";

enum RequestTypes {
  Post = "post",
  Get = "get",
  Delete = "delete"
}

export async function request(
  apiRequest: AxiosRequestConfig
): Promise<[any, any]> {
  try {
    const result = await axios.request(apiRequest);

    return [null, result.data];
  } catch (err) {
    return [err, null];
  }
}

interface IGetRequest {
  url: string;
  params?: any;
  headers?: any;
}

export async function get(getRequest: IGetRequest) {
  const method = RequestTypes.Get;

  return request({ method, ...getRequest });
}

interface IPostRequest {
  url: string;
  data: any;
  params?: any;
  headers?: any;
}

export async function post(postRequest: IPostRequest) {
  const method = RequestTypes.Post;

  return request({ method, ...postRequest });
}
