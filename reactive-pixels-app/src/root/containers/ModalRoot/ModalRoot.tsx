import { hideNotification } from "@modules/notifications/daos/notificationActions";
import { INotificationsState } from "@modules/notifications/daos/notificationReducer";
import { AuthPrompt } from "@modules/ui/structures/AuthPrompt";
import { IBaseTheme, withStyles } from "@modules/ui/theme";
import { IRootState } from "@root/daos/rootReducer";
import classnames from "classnames";
import { css } from "emotion";
import * as React from "react";
import * as ReactModal from "react-modal";
import { connect } from "react-redux";
import { AnyAction, Dispatch } from "redux";
import { bounceIn, scaleIn } from "./modalRootAnimations";

interface IClasses {
  overlay: string;
  root: string;
}

interface IProps {
  classes: IClasses;
  className?: string;
  dispatch: Dispatch<AnyAction>;
  notification: INotificationsState;
  theme: IBaseTheme;
}

const notificationTypes = {
  Auth: AuthPrompt
};

const styles = (theme: IBaseTheme): IClasses => {
  const { borderRadius, spacers } = theme.sizes;
  const { palette } = theme.colours;
  const { breakpoints } = theme;

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
      animation: `${scaleIn} 1000ms linear both`,
      background: palette.white.hex,
      borderRadius: borderRadius.large,
      bottom: 10,
      boxShadow: "0 4px 16px 0 rgba(0, 0, 0, 0.15)",
      display: "flex",
      flexDirection: "column",
      left: 10,
      outline: "none",
      overflow: "auto",
      padding: spacers.medium * 1.5,
      position: "absolute",
      right: 10,
      top: 10,
      [`@media (min-width: ${breakpoints.medium}px)`]: {
        animation: `${bounceIn} 1150ms linear both`,
        borderRadius: borderRadius.large,
        bottom: "auto",
        height: "auto",
        left: "50%",
        marginLeft: -300,
        padding: spacers.large * 1.5,
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
 * ModalRoot
 *
 * @param {string} [className=""] - Extend css classes to override default styling.
 * @example
 * <ModalRoot />
 */
export class ModalRoot extends React.PureComponent<IProps> {
  constructor(props: IProps) {
    super(props);

    this.closeModal = this.closeModal.bind(this);
  }

  public closeModal() {
    const { dispatch } = this.props;

    dispatch(hideNotification());
  }

  public render() {
    const {
      children,
      classes,
      className,
      notification,
      ...otherProps
    } = this.props;

    const SpecificNotification =
      notificationTypes[notification.modalType] || notificationTypes.Auth;

    return (
      <ReactModal
        isOpen={!!notification.modalType}
        className={classnames(classes.root, className)}
        onRequestClose={this.closeModal}
        overlayClassName={classes.overlay}
        {...otherProps}
      >
        <SpecificNotification onClose={this.closeModal} />
      </ReactModal>
    );
  }
}

function mapStateToProps(state: IRootState) {
  return {
    notification: state.notifications
  };
}

export default connect(mapStateToProps)(
  withStyles(styles, { withTheme: true })(ModalRoot)
);
