import { Response } from "express";
import { ApiResponseCodes } from "../constants";
import { IApiResponseModel } from "../models/ApiResponseModel";

export interface ApiResponseProps extends IApiResponseModel {
  response: Response;
  context?: string;
}

const responseMessage = (context?: any) => {
  return {
    [ApiResponseCodes.Success]: `${context} operation completed successfully.`,
    [ApiResponseCodes.NotAuthorised]:
      "user is not authorized to request this action.",
    [ApiResponseCodes.Forbidden]:
      "user is not authorized to request this action.",
    [ApiResponseCodes.NotFound]: `${context} not found.`,
    [ApiResponseCodes.FatalError]: "a fatal error has occured."
  };
};

const getResponseMessage = (context: string, code: number) => {
  return responseMessage(context)[code];
};

export const responseHandler = ({
  response,
  code,
  status,
  context,
  raw,
  data
}: ApiResponseProps) => {
  return response.status(code || ApiResponseCodes.FatalError).json({
    code,
    status,
    message: getResponseMessage(context, code),
    raw,
    data
  });
};
