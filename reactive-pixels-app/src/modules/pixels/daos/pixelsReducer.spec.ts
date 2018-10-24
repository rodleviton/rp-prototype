import {
  pixels1,
  pixelsStateFixture
} from "@modules/pixels/__fixtures__/pixelsFixtures";
import * as actions from "@modules/pixels/daos/pixelsActions";
import reducer, { initialState } from "@modules/pixels/daos/pixelsReducer";

/**
 * STORIES
 */
describe("Pixels Stories", () => {
  describe("initial state", () => {
    it("should match a snapshot", () => {
      expect(reducer(initialState, {} as any)).toMatchSnapshot();
    });
  });

  describe("fetching pixels", () => {
    describe("fetch pixels request", () => {
      it("should `reset` state", () => {
        const action = actions.fetchPixels.request({
          id: "123456"
        });
        const state = reducer(pixelsStateFixture, action);

        expect(state.allIds).toHaveLength(0);
        expect(state.itemsById).toEqual({});
      });
    });

    describe("fetch pixels success", () => {
      it("should `populate` state", () => {
        const action = actions.fetchPixels.success(pixelsStateFixture);
        const state = reducer(initialState, action);

        expect(state.allIds).toHaveLength(1);
        expect(state.allIds[0]).toEqual(pixels1.id);
        expect(state.itemsById).toEqual({
          [pixels1.id]: pixels1
        });
      });
    });

    describe("fetch pixels failure", () => {
      it("should `return` state", () => {
        const action = actions.fetchPixels.failure(Error("Oops."));
        const state = reducer(initialState, action);

        expect(state.allIds).toEqual(initialState.allIds);
        expect(state.itemsById).toEqual(initialState.itemsById);
      });
    });
  });

  describe("selecting pixels", () => {
    it("should set `selected` pixels", () => {
      const action = actions.selectPixels("l7G5RpHUMt4vGslDyz9q");
      const state = reducer(initialState, action);

      expect(state.selected).toEqual("l7G5RpHUMt4vGslDyz9q");
    });
  });
});
