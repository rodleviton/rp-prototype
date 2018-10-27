import { createStandardAction } from "typesafe-actions";

const PREFIX = "@@notification";

export type Notifications = "NOT_AUTHORISED" | "";

export const showNotification = createStandardAction(
  `${PREFIX}/SHOW_NOTIFICATION`
)<Notifications>();

export const hideNotification = createStandardAction(
  `${PREFIX}/HIDE_NOTIFICATION`
)();
