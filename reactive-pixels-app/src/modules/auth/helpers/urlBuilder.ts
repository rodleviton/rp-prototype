import { API_BASE_URL } from "@modules/common/api/apiConstants";

export const buildFetchAuthUserUrl = (id: string) => {
  const fetchAuthUserBaseUrl = `${API_BASE_URL}/users`;

  return `${fetchAuthUserBaseUrl}/${id}`;
};

export const buildCreatAuthUserUrl = (id: string) => {
  const createAuthUserBaseUrl = `${API_BASE_URL}/users`;

  return `${createAuthUserBaseUrl}`;
};
