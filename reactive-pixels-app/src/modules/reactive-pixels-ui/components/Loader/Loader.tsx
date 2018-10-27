import classnames from "classnames";
import { css } from "emotion";
import * as React from "react";
import { IBaseTheme, withStyles } from "../../theme";

type Position = "center" | "default";

interface IClasses {
  center: string;
  spinner: string;
  root: string;
}

interface IProps {
  classes: IClasses;
  className?: string;
  position?: Position;
  theme: IBaseTheme;
}

const styles = (theme: IBaseTheme): IClasses => {
  return {
    center: css({
      left: "50%",
      position: "absolute",
      top: "50%",
      transform: "translate(-50%, -50%)",
      zIndex: 1
    }),
    root: css({
      display: "block",
      height: 38,
      width: 38
    }),
    spinner: css({
      animation: "rp-spinner 0.9s linear infinite",
      ["&:nth-child(1)"]: {
        animationDelay: "-0.8s"
      },
      ["&:nth-child(2)"]: {
        animationDelay: "-0.6s"
      },
      ["@keyframes rp-spinner"]: {
        ["0%"]: {
          opacity: 1
        },
        ["100% "]: {
          opacity: 0.1
        }
      }
    })
  };
};

/**
 * Loading indicator for asynchronous events
 * @param {string} [className=""] - Extend css classes to override default styling.
 * @example
 * <Loader />
 */
class Loader extends React.PureComponent<IProps> {
  public render() {
    const {
      classes,
      className,
      position = "default",
      theme,
      ...otherProps
    } = this.props;

    const { grey4 } = theme.colours.palette;
    const positionStyles = position === "center" ? classes.center : null;

    return (
      <div
        className={classnames(classes.root, positionStyles, className)}
        {...otherProps}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="38"
          height="38"
          viewBox="0 0 460 516"
        >
          <g fill={grey4.hex}>
            <path
              className={classes.spinner}
              d="M333.372031,460 L447.102888,396.049894 C454.225767,391.973054 460,382.065204 460,373.932338 L460,249.593886 L356.224274,190 L355.657897,324.823726 C355.641368,328.729192 352.857585,333.480849 349.437,335.43865 L232,402.227074 L333.372031,460 Z"
            />
            <path
              className={classes.spinner}
              d="M210.509531,3.05293948 C217.583554,-1.02216524 233.04954,-1.01630663 240.11342,3.06249801 L447.204762,124.330903 C454.271377,128.411286 460,138.346818 460,146.527545 L460,246 L233.47922,115.241236 C230.076573,113.302921 224.591894,113.354919 221.221029,115.362032 L105,184.563481 L105,66.1376678 L210.509531,3.05293948 Z"
            />
            <path
              className={classes.spinner}
              d="M1,374.214594 C1,382.34674 5.78727134,392.236312 12.9351163,396.308633 L217.689432,512.962717 C224.8333,517.032772 236.399981,517.009813 243.528593,512.908989 L331,462.589963 L108.177655,334.741092 C104.750877,332.783693 101.972924,328.034824 101.972924,324.124429 L101.972924,68 L12.9872928,118.288501 C5.81460899,122.306552 0,132.156449 0,140.28838 L1,374.214594 Z"
            />
          </g>
        </svg>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Loader);
