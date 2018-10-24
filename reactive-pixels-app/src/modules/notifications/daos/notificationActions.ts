// import { INotificationModel } from "@modules/notifications/models/NotificationModel";
import { createStandardAction } from "typesafe-actions";

const PREFIX = "@@notification";

export const showNotification = createStandardAction(
  `${PREFIX}/SHOW_NOTIFICATION`
)<string>();

export const hideNotification = createStandardAction(
  `${PREFIX}/HIDE_NOTIFICATION`
)();
