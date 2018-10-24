import { createStandardAction } from "typesafe-actions";

const PREFIX = "@@scene/pixels";

// ---------------- Code Panel ---------------- //

export const showCodePanel = createStandardAction(
  `${PREFIX}/SHOW_CODE_PANEL`
)();

export const hideCodePanel = createStandardAction(
  `${PREFIX}/HIDE_CODE_PANEL`
)();
