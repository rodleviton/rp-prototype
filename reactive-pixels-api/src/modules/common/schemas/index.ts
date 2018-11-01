import { queryTypeDef } from "./QuerySchema";
import { mutationTypeDef } from "./MutationsSchema";
import { pixelsTypeDef, pixelsResolver } from "./PixelsSchema";
import {
  pixelsMetadataTypeDef,
  pixelsMetadataResolver
} from "./PixelsMetadataSchema";
import {
  pixelsCommentTypeDef,
  pixelsCommentResolver
} from "./PixelsCommentSchema";
import { userTypeDef, userResolver } from "./UserSchema";
import { merge } from "lodash";

export const typeDefs = [
  queryTypeDef,
  mutationTypeDef,
  pixelsTypeDef,
  pixelsMetadataTypeDef,
  pixelsCommentTypeDef,
  userTypeDef
];

export const resolvers = merge(
  pixelsResolver,
  pixelsCommentResolver,
  pixelsMetadataResolver,
  userResolver
);
