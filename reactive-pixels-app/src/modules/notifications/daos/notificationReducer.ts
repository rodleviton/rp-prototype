import * as notificationActions from "@modules//notifications/daos/notificationActions";
import { ActionType, getType } from "typesafe-actions";

export type NotificationAction = ActionType<typeof notificationActions>;

const { hideNotification, showNotification } = notificationActions;

export interface INotificationsState {
  modalType: notificationActions.Notifications;
}

export const initialState: INotificationsState = {
  modalType: ""
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case getType(showNotification):
      return { modalType: action.payload };

    case getType(hideNotification):
      return {}; // clear out existing data

    default:
      return state;
  }
};
