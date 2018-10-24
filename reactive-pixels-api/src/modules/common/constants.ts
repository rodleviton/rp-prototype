export enum ApiResponseTypes {
  Success = "SUCCESS",
  NotAuthorised = "NOT_AUTHORISED",
  Forbidden = "FORBIDDEN",
  NotFound = "NOT_FOUND",
  FatalError = "FATAL_ERROR"
}

export enum ApiResponseCodes {
  Success = 200,
  NotAuthorised = 401,
  Forbidden = 403,
  NotFound = 404,
  FatalError = 500
}

export const FirebaseApiResponseCodes = {
  auth: ApiResponseCodes.NotAuthorised
};

export const FirebaseApiResponseTypes = {
  auth: ApiResponseTypes.NotAuthorised
};
