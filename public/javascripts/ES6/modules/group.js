import Composite from "./composite";

/**
 *
 */
export default class Group extends Composite {
  constructor(name, elements) {
    super(name);
    this._m_elements = elements;
  }

  get elements() {
    return this._m_elements;
  }

  set elements(value) {
    this._m_elements = value;
  }

  toHTML() {
    const content = $("<div>", {class: "row"});
    let container;

    for (let element of this.elements) {
      container = $("<div>", {
        class: `columns medium-${element.layout.medium} large-${element.layout.large}`
      });
      container.append(element.content.toHTML());
      content.append(container);
    }

    return content;
  }
}
