import {
  GITHUB_SRC_BASE_URL,
  GITHUB_USER_CONTENT_BASE_URL,
  PIXELS_BASE_URL
} from "../rootConstants";

export const buildPixelsRoute = (pixelsId: string, username: string) =>
  `/${username}/${PIXELS_BASE_URL}/${pixelsId}`;

export const buildPixelsCommentsRoute = (pixelsId: string, username: string) =>
  `/${username}/${PIXELS_BASE_URL}/${pixelsId}/comments`;

export const buildPixelsMetaRoute = (pixelsId: string, username: string) =>
  `/${username}/${PIXELS_BASE_URL}/${pixelsId}/meta`;

export const buildPixelsPreviewRoute = (owner: string, repo: string) =>
  `${GITHUB_USER_CONTENT_BASE_URL}/${owner}/${repo}/master/screenshot.jpg`;

export const buildPixelsSandboxRoute = (owner: string, repo: string) =>
  `${GITHUB_SRC_BASE_URL}/${owner}/${repo}/master/build/index.html`;
