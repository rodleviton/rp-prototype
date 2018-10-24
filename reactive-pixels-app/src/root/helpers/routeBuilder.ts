import { PIXELS_BASE_URL } from "../rootConstants";

export const buildPixelsRoute = (pixelsId: string, username: string) =>
  `/${username}/${PIXELS_BASE_URL}/${pixelsId}`;

export const buildPixelsCommentsRoute = (pixelsId: string, username: string) =>
  `/${username}/${PIXELS_BASE_URL}/${pixelsId}/comments`;

export const buildPixelsMetaRoute = (pixelsId: string, username: string) =>
  `/${username}/${PIXELS_BASE_URL}/${pixelsId}/meta`;
