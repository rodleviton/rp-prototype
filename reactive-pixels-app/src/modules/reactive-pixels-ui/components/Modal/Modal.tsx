import classnames from "classnames";
import { css } from "emotion";
import * as React from "react";
import { keyframes } from "react-emotion";
import * as ReactModal from "react-modal";
import { IBaseTheme, withStyles } from "../../theme";

interface IClasses {
  overlay: string;
  root: string;
}

interface IProps {
  classes: IClasses;
  className?: string;
}

interface IState {
  isOpen: boolean;
}

const styles = (theme: IBaseTheme): IClasses => {
  const { borderRadius, spacers } = theme.sizes;
  const { palette } = theme.colours;
  const { breakpoints } = theme;

  const bounce = keyframes`
    0% { transform: matrix3d(0.5, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 300, 0, 1); }
    4.3% { transform: matrix3d(0.704, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 145.719, 0, 1); }
    4.7% { transform: matrix3d(0.725, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 133.09, 0, 1); }
    8.61% { transform: matrix3d(0.91, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 36.424, 0, 1); }
    9.41% { transform: matrix3d(0.942, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 22.722, 0, 1); }
    12.91% { transform: matrix3d(1.047, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, -15.683, 0, 1); }
    14.11% { transform: matrix3d(1.07, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, -22.147, 0, 1); }
    17.22% { transform: matrix3d(1.103, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, -28, 0, 1); }
    18.72% { transform: matrix3d(1.106, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, -26.999, 0, 1); }
    24.32% { transform: matrix3d(1.075, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, -14.824, 0, 1); }
    28.33% { transform: matrix3d(1.038, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, -6.188, 0, 1); }
    29.93% { transform: matrix3d(1.024, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, -3.625, 0, 1); }
    35.54% { transform: matrix3d(0.99, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1.212, 0, 1); }
    39.44% { transform: matrix3d(0.981, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1.869, 0, 1); }
    41.04% { transform: matrix3d(0.98, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1.794, 0, 1); }
    52.15% { transform: matrix3d(0.996, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0.242, 0, 1); }
    61.66% { transform: matrix3d(1.004, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, -0.125, 0, 1); }
    63.26% { transform: matrix3d(1.004, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, -0.12, 0, 1); }
    83.98% { transform: matrix3d(0.999, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0.008, 0, 1); }
    85.49% { transform: matrix3d(0.999, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0.008, 0, 1); }
    100% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }`;

  const scale = keyframes`
    0% { transform: matrix3d(0.5, 0, 0, 0, 0, 0.5, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
    4.3% { transform: matrix3d(0.757, 0, 0, 0, 0, 0.757, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
    8.61% { transform: matrix3d(0.939, 0, 0, 0, 0, 0.939, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
    12.91% { transform: matrix3d(1.026, 0, 0, 0, 0, 1.026, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
    17.22% { transform: matrix3d(1.047, 0, 0, 0, 0, 1.047, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
    28.33% { transform: matrix3d(1.01, 0, 0, 0, 0, 1.01, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
    39.44% { transform: matrix3d(0.997, 0, 0, 0, 0, 0.997, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
    61.66% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
    83.98% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
    100% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);`;

  return {
    overlay: css({
      backgroundColor: "rgba(0, 0, 0, 0.25)",
      bottom: 0,
      left: 0,
      position: "fixed",
      right: 0,
      top: 0,
      zIndex: 300
    }),
    root: css({
      animation: `${scale} 1000ms linear both`,
      background: palette.white.hex,
      borderRadius: borderRadius.large,
      bottom: 10,
      boxShadow: "0 4px 16px 0 rgba(0, 0, 0, 0.15)",
      display: "flex",
      flexDirection: "column",
      left: 10,
      outline: "none",
      overflow: "auto",
      padding: spacers.small * 1.5,
      position: "absolute",
      right: 10,
      top: 10,
      [`@media (min-width: ${breakpoints.medium}px)`]: {
        animation: `${bounce} 1150ms linear both`,
        borderRadius: borderRadius.large,
        bottom: "auto",
        height: "auto",
        left: "50%",
        marginLeft: -300,
        padding: spacers.medium * 1.5,
        right: "auto",
        top: 40,
        width: 600
      }
    })
  };
};

// Properly hide application from screenreaders and
// other assistive technologies while the modal is open.
ReactModal.setAppElement("#root");

/**
 * Modal
 *
 * @param {string} [className=""] - Extend css classes to override default styling.
 * @example
 * <Modal />
 */
export class Modal extends React.PureComponent<IProps, IState> {
  public state = {
    isOpen: false
  };

  constructor(props: IProps) {
    super(props);

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  public componentWillMount() {
    setTimeout(this.openModal, 2000);
  }

  public closeModal() {
    this.setState({ isOpen: false });
  }

  public openModal() {
    this.setState({ isOpen: true });
  }

  public render() {
    const { children, classes, className, ...otherProps } = this.props;
    const { isOpen } = this.state;

    return (
      <ReactModal
        isOpen={isOpen}
        className={classnames(classes.root, className)}
        onRequestClose={this.closeModal}
        overlayClassName={classes.overlay}
        {...otherProps}
      >
        {children}
      </ReactModal>
    );
  }
}

export default withStyles(styles)(Modal);
