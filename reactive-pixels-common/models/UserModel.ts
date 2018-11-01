import { IPixelsModel } from "./PixelsModel";

export interface IUserModel {
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

export interface IUserExtendedModel extends IUserModel {
  pixels: IPixelsModel[];
}
