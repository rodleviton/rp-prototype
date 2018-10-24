export interface IAuthUserModel {
  authToken: string;
  refreshToken: string;

  // TODO - What do we keep?
  id: string;
  email: string;
  githubUserId: string;
  displayName: string;
  following: string[];
  followers: string[];
  likedPixels: string[];
  username: string;
  location: string;
  creationTime: number;
  lastSignInTime: number;
  isFirstLogin: boolean;
}
