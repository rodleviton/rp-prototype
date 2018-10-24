import {
  fetchPixelsSuccessMultipleFixture,
  fetchPixelsSuccessSingleFixture,
  pixels1,
  pixels2,
  pixels3
} from "@modules/pixels/__fixtures__/pixelsFixtures";
import { fetchPixels } from "@modules/pixels/daos/pixelsActions";
import fetchPixelsSaga, {
  fetchPixelsFromAPI
} from "@modules/pixels/daos/pixelsSaga";
import { expectSaga } from "redux-saga-test-plan";
import * as matchers from "redux-saga-test-plan/matchers";
import { getType } from "typesafe-actions";

describe("Pixels Saga", () => {
  describe("successful API response", () => {
    it("should handle a single result", () => {
      const requestPayload = { id: "8xwSGZmaKbrxPUIVSNxM" };

      return expectSaga(fetchPixelsSaga)
        .provide([
          [matchers.call.fn(fetchPixelsFromAPI), [null, { data: pixels1 }]]
        ])
        .put({
          payload: fetchPixelsSuccessSingleFixture,
          type: getType(fetchPixels.success)
        })
        .dispatch({
          payload: requestPayload,
          type: getType(fetchPixels.request)
        })
        .silentRun();
    });

    it("should handle a multiple results", () => {
      const requestPayload = { owner: "winston" };

      return expectSaga(fetchPixelsSaga)
        .provide([
          [
            matchers.call.fn(fetchPixelsFromAPI),
            [null, { data: [pixels1, pixels2, pixels3] }]
          ]
        ])
        .put({
          payload: fetchPixelsSuccessMultipleFixture,
          type: getType(fetchPixels.success)
        })
        .dispatch({
          payload: requestPayload,
          type: getType(fetchPixels.request)
        })
        .silentRun();
    });
  });

  it("should handle a error API response", () => {
    const id = "8xwSGZmaKbrxPUIVSNxM";
    const error = { error: 404 };

    return expectSaga(fetchPixelsSaga)
      .provide([[matchers.call.fn(fetchPixelsFromAPI), [error, null]]])
      .put({ type: getType(fetchPixels.failure) })
      .dispatch({
        payload: { id },
        type: getType(fetchPixels.request)
      })
      .silentRun();
  });
});
