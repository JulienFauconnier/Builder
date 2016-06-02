import Composite from "./composite";

export default class Group extends Composite {
  constructor(name, layout, components) {
    super(name);
    this._m_layout = layout;
    this._m_components = components;
  }

  get layout() {
    return this._m_layout;
  }

  set layout(value) {
    this._m_layout = value;
  }

  get components() {
    return this._m_components;
  }

  set components(value) {
    this._m_components = value;
  }

  toHTML() {
    const content = $("<div>", {class: "row"});
    let container;

    jQuery.each(this.components, (key, component) => {
      container = $("<div>", {
        class: `columns medium-${this.layout.medium} large-${this.layout.large}`
      });
      container.append(component.toHTML());
      content.append(container);
    });

    return content;
  }
}
