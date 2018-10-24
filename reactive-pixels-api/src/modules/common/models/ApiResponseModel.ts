export interface IApiResponseModel {
  code: number;
  status: string;
  message?: string;
  raw?: string;
  data?: any;
}
