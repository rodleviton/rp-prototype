import { ApiMethods } from "@modules/common/api/apiConstants";
import { likePixels } from "@modules/pixels/daos/pixelsActions";
import {
  buildPixelsPreviewUrl,
  buildPixelsSandboxUrl
} from "@modules/pixels/helpers/urlBuilder";
import { buildPixelsRoute } from "@root/helpers/routeBuilder";
import * as React from "react";
import { connect } from "react-redux";
import { IPixelsModel } from "reactive-pixels-common/models/PixelsModel";
import { AnyAction, Dispatch } from "redux";
import { ActionType } from "typesafe-actions";

interface IPixelsData extends IPixelsModel {
  onPixelsLike: () => ActionType<typeof likePixels.request>;
  isLikedByLoggedInUser: boolean;
  iframeSrc: string;
  imageSrc: string;
  numberOfLikes: number;
  url: string;
}

interface IProps {
  dispatch: Dispatch<AnyAction>;
  loggedInUserId?: string; // Do not pass in User. Pixels will have no knowledge of this.
  pixels: IPixelsModel;
  render: (data: IPixelsData) => React.ReactNode;
}
/**
 * PixelsComposer
 *
 * @description
 * Connected render props component for preparing Pixels data.
 *
 * @example
 * <Pixels />
 */
class PixelsComposer extends React.PureComponent<IProps> {
  public isLikedByLoggedInUser = (likes: string[]) => {
    const { loggedInUserId = "" } = this.props;

    return likes && likes.includes(loggedInUserId);
  };

  public onPixelsLike = () => {
    const { dispatch, loggedInUserId = "", pixels } = this.props;
    const isLikedByLoggedInUser =
      pixels.likes && pixels.likes.includes(loggedInUserId);
    const method = isLikedByLoggedInUser ? ApiMethods.Delete : ApiMethods.Post;

    return () =>
      dispatch(
        likePixels.request({
          method,
          pixelsId: pixels.id,
          userId: loggedInUserId
        })
      );
  };

  public render() {
    const { render, pixels } = this.props;

    if (!pixels) {
      return render({} as IPixelsData);
    }

    const data: IPixelsData = {
      iframeSrc: buildPixelsSandboxUrl(pixels.owner, pixels.repo),
      imageSrc: buildPixelsPreviewUrl(pixels.owner, pixels.repo),
      isLikedByLoggedInUser: this.isLikedByLoggedInUser(pixels.likes),
      numberOfLikes: pixels.likes.length,
      onPixelsLike: this.onPixelsLike(),
      url: buildPixelsRoute(pixels.id, pixels.owner),
      ...pixels
    };

    return render(data);
  }
}

export default connect()(PixelsComposer);
