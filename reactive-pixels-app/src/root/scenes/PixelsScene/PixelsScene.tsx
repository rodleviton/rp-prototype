import { Slider } from "@modules/reactive-pixels-ui/structures/Slider";
import {
  buildPixelsCommentsRoute,
  buildPixelsMetaRoute,
  buildPixelsRoute
} from "@root/helpers/routeBuilder";
import { History } from "history";
import * as React from "react";
import { PixelsCommentsSlider } from "./components/PixelsCommentsSlider";
import { PixelsHeroSlider } from "./components/PixelsHeroSlider";
import { PixelsMetadataSlider } from "./components/PixelsMetadataSlider";

type IPanelTypes = "comments" | "meta";

interface IRouteParams {
  id: string;
  username: string;
  type?: IPanelTypes;
}

interface IProps {
  history: History;
  match: {
    params: IRouteParams;
    url: string;
  };
}

class PixelsScene extends React.PureComponent<IProps> {
  public isCommentsPanelActive = () => {
    const { type } = this.props.match.params;

    return type === "comments";
  };

  public isMetaPanelActive = () => {
    const { type } = this.props.match.params;

    return type === "meta";
  };

  public onCommentsButtonToggle = () => {
    const { history } = this.props;
    const { id, username }: IRouteParams = this.props.match.params;
    const pixelsRoute = buildPixelsRoute(id, username);
    const commentsRoute = buildPixelsCommentsRoute(id, username);

    // TODO - Abstract route handling
    this.isCommentsPanelActive()
      ? history.push(pixelsRoute)
      : history.push(commentsRoute);
  };

  public onMetaButtonToggle = () => {
    const { history } = this.props;
    const { id, username } = this.props.match.params;
    const pixelsRoute = buildPixelsRoute(id, username);
    const sourceRoute = buildPixelsMetaRoute(id, username);

    // TODO - Abstract route handling
    this.isMetaPanelActive()
      ? history.push(pixelsRoute)
      : history.push(sourceRoute);
  };

  public render() {
    const isCommentsPanelActive = this.isCommentsPanelActive();
    const isMetaPanelActive = this.isMetaPanelActive();

    return (
      <Slider>
        <PixelsCommentsSlider
          active={isCommentsPanelActive}
          onToggle={this.onCommentsButtonToggle}
        />

        <PixelsHeroSlider
          isCommentsPanelActive={isCommentsPanelActive}
          isMetaPanelActive={isMetaPanelActive}
        />

        <PixelsMetadataSlider
          active={isMetaPanelActive}
          onToggle={this.onMetaButtonToggle}
        />
      </Slider>
    );
  }
}

export default PixelsScene;
