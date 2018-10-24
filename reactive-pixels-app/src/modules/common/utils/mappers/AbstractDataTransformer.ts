import { IDataTransformerInterface } from "./DataTransformerInterface";

export default class AbstractDataTransformer
  implements IDataTransformerInterface {
  /**
   * @param {object[]} source
   * @return {Array}
   */
  public convertMultiple(source: any[]): any {
    throw new Error(
      `This is an abstract method that needs to be implemented with the source: ${source} argument`
    );
  }

  /**
   * @param {object} source
   * @return {object}
   */
  public convertSingle(source: any): any {
    throw new Error(
      `This is an abstract method that needs to be implemented with the source: ${source} argument`
    );
  }
}
