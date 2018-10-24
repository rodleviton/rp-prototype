import { Icon } from "@modules/ui/components/Icon";
import { SliderGutter, SliderPanel } from "@modules/ui/structures/Slider";
import { withStyles } from "@modules/ui/theme";
import { DeferredRenderer } from "@root/components/DeferredRenderer";
import classnames from "classnames";
import * as React from "react";
import { IClasses, styles } from "../../pixelsSceneStyles";

interface IProps {
  active: boolean;
  classes: IClasses;
  onToggle: () => any;
}

class CommentsSlider extends React.PureComponent<IProps> {
  public render() {
    const { active, classes, onToggle } = this.props;

    return (
      <SliderPanel
        className={classnames(classes.default.panel, classes.comments.panel, {
          [classes.default.active]: active
        })}
      >
        <DeferredRenderer
          condition={active}
          render={shouldRender => shouldRender && <div>Comments</div>}
        />
        <SliderGutter
          className={classes.comments.gutter}
          active={active}
          onClick={onToggle}
        >
          <Icon.Heart colour="light" />
        </SliderGutter>
      </SliderPanel>
    );
  }
}

export default withStyles(styles)(CommentsSlider);
