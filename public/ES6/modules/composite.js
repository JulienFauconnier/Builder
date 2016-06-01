export class Composite {
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

export class Structure extends Composite {
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

    jQuery.each(this.childrens, (key, children) => {
      content.append(children.toHTML());
    });

    return content;
  }
}

export class Group extends Composite {
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
