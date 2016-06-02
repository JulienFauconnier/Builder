export default class Composite {
  constructor(name) {
    this._m_name = name;
  }

  get name() {
    return this._m_name;
  }

  set name(value) {
    this._m_name = value;
  }
}
