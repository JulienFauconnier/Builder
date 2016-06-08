/**
 * Created by uneek on 08/06/16.
 */

import Base from "./base";

let instance = null;

export default class Foundation6 extends Base {
  constructor(row, column) {
    super(row, column);

    if (!instance) {
      instance = this;
    }

    return instance;
  }
}