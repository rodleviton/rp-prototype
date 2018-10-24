import * as React from "react";
import Check from "./Icons/Check";
import ChevronLeft from "./Icons/ChevronLeft";
import Clock from "./Icons/Clock";
import Cross from "./Icons/Cross";
import Github from "./Icons/Github";
import Heart from "./Icons/Heart";
import Success from "./Icons/Success";
import withSvg from "./withSvg";

class Icon extends React.PureComponent {
  public static Check = withSvg(Check);
  public static ChevronLeft = withSvg(ChevronLeft);
  public static Clock = withSvg(Clock);
  public static Cross = withSvg(Cross);
  public static Github = withSvg(Github);
  public static Heart = withSvg(Heart);
  public static Success = withSvg(Success);

  /**
   * This is a compound component and cannot be used directly.
   * @example
   * <Icon.Github />
   */
  public render() {
    return null;
  }
}

export default Icon;
