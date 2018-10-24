import { Icon } from "@modules/ui/components/Icon";
import { SliderGutter, SliderPanel } from "@modules/ui/structures/Slider";
import { withStyles } from "@modules/ui/theme";
import { DeferredRenderer } from "@root/components/DeferredRenderer";
import { PixelsMeta } from "@root/components/PixelsMeta";
import classnames from "classnames";
import * as React from "react";
import { IClasses, styles } from "../../pixelsSceneStyles";

interface IProps {
  active: boolean;
  classes: IClasses;
  onToggle: () => any;
}

class MetaSlider extends React.PureComponent<IProps> {
  public render() {
    const { active, classes, onToggle } = this.props;

    return (
      <SliderPanel
        className={classnames(classes.default.panel, classes.code.panel, {
          [classes.default.active]: active
        })}
      >
        <DeferredRenderer
          condition={active}
          render={shouldRender => shouldRender && <PixelsMeta />}
        />

        <SliderGutter
          className={classes.code.gutter}
          active={active}
          onClick={onToggle}
        >
          <Icon.Github colour="light" />
        </SliderGutter>
      </SliderPanel>
    );
  }
}

export default withStyles(styles)(MetaSlider);
