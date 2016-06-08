/**
 * Created by uneek on 08/06/16.
 */

let instance = null;

export default class Layout {
  constructor(row, column) {
    if (!instance) {
      instance = this;
    }

    this._m_row = row;
    this._m_column = column;
    this._m_time = new Date();

    return instance;
  }

  get row() {
    return this._m_row;
  }

  set row(value) {
    this._m_row = value;
  }

  get column() {
    return this._m_column;
  }

  set column(value) {
    this._m_column = value;
  }

  get time() {
    return this._m_time;
  }
}