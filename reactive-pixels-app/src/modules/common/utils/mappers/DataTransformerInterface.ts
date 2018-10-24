export interface IDataTransformerInterface {
  /**
   * @param {object[]} source
   * @return {Array}
   * @protected
   */
  convertMultiple(source: any[]): any;

  /**
   * @param {object} source
   * @return {object}
   * @protected
   */
  convertSingle(source: any): any;
}
