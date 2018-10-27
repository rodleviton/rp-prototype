import {
  IVariables,
  UPDATE_PIXELS_LIKES
} from "@modules/graphql/UpdatePixelsLikesMutation";
import { graphql } from "react-apollo";

const withUpdatePixelsLikesMutation = graphql<{}, Response, IVariables>(
  UPDATE_PIXELS_LIKES,
  {
    // options: ({ episode }) => ({
    //   variables: { episode }
    // })
  }
);

export default withUpdatePixelsLikesMutation;
