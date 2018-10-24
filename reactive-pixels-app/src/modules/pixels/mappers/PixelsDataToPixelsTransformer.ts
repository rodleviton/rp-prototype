import AbstractDataTransformer from "@modules/common/utils/mappers/AbstractDataTransformer";
import { IPixelsModel } from "reactive-pixels-common/models/PixelsModel";

export interface IPixelsDataColection {
  allIds: string[];
  itemsById: {
    [k: string]: IPixelsModel;
  };
}

export default class PixelsDataToPixelsTransformer extends AbstractDataTransformer {
  /**
   * @param {IPixelsModel[]} source
   * @return {IPixelsData[]}
   * @private
   */
  public convertMultiple(source: IPixelsModel[]): IPixelsDataColection {
    // Abort transform immediatly if we have nothing
    if (!source.length) {
      return {
        allIds: [],
        itemsById: {}
      };
    }

    const allIds = source.map(item => item.id);
    const itemsById = source.reduce(
      (acc, curr) => ({
        ...acc,
        // We explicitly build our pixels object so
        // we are guaranteed what we should be passing through
        [curr.id]: {
          id: curr.id,
          likes: curr.likes,
          owner: curr.owner,
          repo: curr.repo,
          title: curr.title,
          uid: curr.uid
        }
      }),
      {}
    );

    return {
      allIds,
      itemsById
    };
  }
}
