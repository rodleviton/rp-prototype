import * as React from "react";
import Check from "./Icons/Check";
import ChevronDown from "./Icons/ChevronDown";
import ChevronLeft from "./Icons/ChevronLeft";
import ChevronRight from "./Icons/ChevronRight";
import ChevronUp from "./Icons/ChevronUp";
import Clock from "./Icons/Clock";
import Code from "./Icons/Code";
import Comment from "./Icons/Comment";
import Cross from "./Icons/Cross";
import Github from "./Icons/Github";
import Heart from "./Icons/Heart";
import Logout from "./Icons/Logout";
import Success from "./Icons/Success";
import withSvg from "./withSvg";

class Icon extends React.PureComponent {
  public static Check = withSvg(Check);
  public static ChevronDown = withSvg(ChevronDown);
  public static ChevronLeft = withSvg(ChevronLeft);
  public static ChevronRight = withSvg(ChevronRight);
  public static ChevronUp = withSvg(ChevronUp);
  public static Clock = withSvg(Clock);
  public static Code = withSvg(Code);
  public static Comment = withSvg(Comment);
  public static Cross = withSvg(Cross);
  public static Github = withSvg(Github);
  public static Heart = withSvg(Heart);
  public static Logout = withSvg(Logout);
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
