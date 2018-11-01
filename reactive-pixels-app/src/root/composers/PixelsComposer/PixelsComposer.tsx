import {
  buildPixelsPreviewRoute,
  buildPixelsRoute,
  buildPixelsSandboxRoute
} from "@root/helpers/routeBuilder";
import { UpdatePixelsLikesMethod } from "@root/hoc/withLikePixelsHandler";
import * as React from "react";
import { IPixelsModel } from "reactive-pixels-common/models/PixelsModel";

interface IPixelsData extends IPixelsModel {
  onUpdatePixelsLikesVariables: { id: string; method: UpdatePixelsLikesMethod };
  isLikedByLoggedInUser: boolean;
  iframeSrc: string;
  imageSrc: string;
  url: string;
}

interface IProps {
  loggedInUserId: string;
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

  public getUpdatePixelsLikesVariables = () => {
    const { pixels } = this.props;
    const method: UpdatePixelsLikesMethod = this.isLikedByLoggedInUser(
      pixels.likes
    )
      ? "remove"
      : "add";

    return { id: pixels.id, method };
  };

  public render() {
    const { render, pixels } = this.props;

    if (!pixels || !pixels.id) {
      return render({} as IPixelsData);
    }

    const data: IPixelsData = {
      iframeSrc: buildPixelsSandboxRoute(pixels.owner, pixels.repo),
      imageSrc: buildPixelsPreviewRoute(pixels.owner, pixels.repo),
      isLikedByLoggedInUser: this.isLikedByLoggedInUser(pixels.likes),
      onUpdatePixelsLikesVariables: this.getUpdatePixelsLikesVariables(),
      url: buildPixelsRoute(pixels.id, pixels.owner),
      ...pixels
    };

    return render(data);
  }
}

export default PixelsComposer;
