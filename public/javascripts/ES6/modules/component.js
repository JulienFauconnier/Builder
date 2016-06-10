export default class Component {
  constructor(name, tag, attributes) {
    this._m_name = name;
    this._m_tag = tag;
    this._m_attributes = attributes;
  }

  get name() {
    return this._m_name;
  }

  set name(value) {
    this._m_name = value;
  }

  get tag() {
    return this._m_tag;
  }

  set tag(value) {
    this._m_tag = value;
  }

  get attributes() {
    return this._m_attributes;
  }

  set attributes(value) {
    this._m_attributes = value;
  }

  toHTML() {
    return $(`<${this.tag}>`, this.attributes);
  }
}
