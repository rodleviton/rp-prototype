import { IFetchPixelsSuccess } from "@modules/pixels/daos/pixelsActions";
import { IPixelsState } from "@modules/pixels/daos/pixelsReducer";
import { IPixelsModel } from "reactive-pixels-common/models/PixelsModel";

// ----------------- PIXELS: WINSTON ----------------//

export const pixels1: IPixelsModel = {
  id: "8xwSGZmaKbrxPUIVSNxM",
  likes: ["123456"],
  owner: "winston",
  repo: "griddy",
  title: "Griddy",
  uid: "gJXsjA3Awjb2r4dZNo7UJcz2XNd2"
};

export const pixels2: IPixelsModel = {
  id: "YXEKH2siDkhPoXalIoC7",
  likes: ["123456"],
  owner: "winston",
  repo: "griddy",
  title: "Paris",
  uid: "gJXsjA3Awjb2r4dZNo7UJcz2XNd2"
};

export const pixels3: IPixelsModel = {
  id: "l7G5RpHUMt4vGslDyz9q",
  likes: ["123456"],
  owner: "winston",
  repo: "chart",
  title: "Chart",
  uid: "gJXsjA3Awjb2r4dZNo7UJcz2XNd2"
};

// Single entry
export const fetchPixelsSuccessSingleFixture: IFetchPixelsSuccess = {
  allIds: [pixels1.id],
  itemsById: {
    [pixels1.id]: pixels1
  }
};

// Multiple entries
export const fetchPixelsSuccessMultipleFixture: IFetchPixelsSuccess = {
  allIds: [pixels1.id, pixels2.id, pixels3.id],
  itemsById: {
    [pixels1.id]: pixels1,
    [pixels2.id]: pixels2,
    [pixels3.id]: pixels3
  }
};

export const pixelsStateFixture: IPixelsState = {
  allIds: [pixels1.id],
  itemsById: {
    [pixels1.id]: pixels1
  },
  selected: {
    comments: [],
    id: pixels1.id,
    meta: {}
  }
};
