import Composite from "./composite";

/**
 *
 */
export default class Structure extends Composite {
  constructor(name, parents, childrens) {
    super(name);
    this._m_parent = parents;
    this._m_childrens = childrens;
  }

  get parent() {
    return this._m_parent;
  }

  set parent(value) {
    this._m_parent = value;
  }

  get childrens() {
    return this._m_childrens;
  }

  set childrens(value) {
    this._m_childrens = value;
  }

  toHTML() {
    const content = $(`<${this.parent.tag}>`, this.parent.attributes);

    for (const children of this.childrens)
      content.append(children.toHTML());

    return content;
  }
}
