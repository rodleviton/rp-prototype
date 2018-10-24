"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responseMessage = context => {
  return {
    200: `${context} operation completed successfully.`,
    401: "user is not authorized to request this action.",
    403: "user is not authorized to request this action.",
    404: `${context} not found.`,
    500: "a fatal error has occured."
  };
};
const getResponseMessage = (context, code) => {
  return responseMessage(context)[code];
};
exports.responseHandler = ({ response, code, status, context, raw, data }) => {
  return response.status(code).json({
    code,
    status,
    message: getResponseMessage(context, code),
    raw,
    data
  });
};
//# sourceMappingURL=response-handler.js.map
