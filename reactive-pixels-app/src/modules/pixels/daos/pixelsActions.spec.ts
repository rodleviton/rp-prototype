import { ApiMethods } from "@modules/common/api/apiConstants";
import { fetchPixelsSuccessSingleFixture } from "@modules/pixels/__fixtures__/pixelsFixtures";
import { fetchPixels, likePixels, selectPixels } from "./pixelsActions";

describe("likePixels actions", () => {
  it("should handle request", () => {
    const requestResult = likePixels.request({
      method: ApiMethods.Post,
      pixelsId: "etbw763t4tr6326dy",
      userId: "uyf78nwetf7t38ntr"
    });

    expect(requestResult).toEqual({
      payload: {
        method: ApiMethods.Post,
        pixelsId: "etbw763t4tr6326dy",
        userId: "uyf78nwetf7t38ntr"
      },
      type: "@@pixels/LIKE_PIXELS_REQUEST"
    });
  });

  it("should handle success", () => {
    const successResult = likePixels.success();
    expect(successResult).toEqual({
      type: "@@pixels/LIKE_PIXELS_SUCCESS"
    });
  });

  it("should handle failure", () => {
    const failureResult = likePixels.failure(Error("Failure reason"));
    expect(failureResult).toEqual({
      payload: Error("Failure reason"),
      type: "@@pixels/LIKE_PIXELS_FAILURE"
    });
  });
});

describe("fetchPixels actions", () => {
  it("should handle request", () => {
    const requestResult = fetchPixels.request({
      id: "123456"
    });

    expect(requestResult).toEqual({
      payload: {
        id: "123456"
      },
      type: "@@pixels/FETCH_PIXELS_REQUEST"
    });
  });

  it("should handle success", () => {
    const successResult = fetchPixels.success(fetchPixelsSuccessSingleFixture);
    expect(successResult).toEqual({
      payload: fetchPixelsSuccessSingleFixture,
      type: "@@pixels/FETCH_PIXELS_SUCCESS"
    });
  });

  it("should handle failure", () => {
    const failureResult = fetchPixels.failure(Error("Failure reason"));
    expect(failureResult).toEqual({
      payload: Error("Failure reason"),
      type: "@@pixels/FETCH_PIXELS_FAILURE"
    });
  });
});

describe("selectPixels action", () => {
  it("should handle action", () => {
    expect(selectPixels("8xwSGZmaKbrxPUIVSNxM")).toEqual({
      payload: "8xwSGZmaKbrxPUIVSNxM",
      type: "@@pixels/SELECT_PIXELS"
    });
  });
});
