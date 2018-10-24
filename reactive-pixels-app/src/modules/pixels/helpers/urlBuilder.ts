import {
  API_BASE_URL,
  GITHUB_SRC_BASE_URL,
  GITHUB_USER_CONTENT_BASE_URL
} from "@modules/common/api/apiConstants";

export const buildPixelsPreviewUrl = (owner: string, repo: string) =>
  `${GITHUB_USER_CONTENT_BASE_URL}/${owner}/${repo}/master/screenshot.jpg`;

export const buildPixelsSandboxUrl = (owner: string, repo: string) =>
  `${GITHUB_SRC_BASE_URL}/${owner}/${repo}/master/build/index.html`;

export const buildLikePixelsUrl = (pixelsId: string) =>
  `${API_BASE_URL}/pixels/${pixelsId}/likes`;

export const buildFetchPixelsMetaUrl = (pixelsId: string) =>
  `${API_BASE_URL}/pixels/${pixelsId}/meta`;

export const buildFetchPixelsCommentsUrl = (pixelsId: string) =>
  `${API_BASE_URL}/pixels/${pixelsId}/comments`;

export const buildFetchPixelsUrl = (id?: string, owner?: string) => {
  const fetchPixelsBaseUrl = `${API_BASE_URL}/pixels`;

  if (id) {
    return `${fetchPixelsBaseUrl}/${id}`;
  }

  if (owner) {
    return `${fetchPixelsBaseUrl}?owner=${owner}`;
  }

  return fetchPixelsBaseUrl;
};
