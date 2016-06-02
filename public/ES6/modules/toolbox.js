import Tool from "./tool";

export default function init(div) {
  $.widget('plb.toolbox', {
    options: {
      debug: false
    },
    draggables: null,
    _create() {
      const that = this;
      if (this.options.debug) {
        window.console.log("debug mode enabled");
        this.element.addClass("debug");
      }

      let li;
      let span;

      const components = Tool.initComponents();
      const structures = Tool.initStructures(components);
      const groups = Tool.initGroups(components);

      jQuery.each(components, (index, component) => {
        li = $("<li>");
        li.data("data", component.toHTML());
        span = $("<span>", {class: "label"});
        span.text(component.name);
        li.append(span);
        $("#componentsContainer").append(li);
      });

      jQuery.each(structures, (index, structure) => {
        li = $("<li>");
        li.data("data", structure.toHTML());
        span = $("<span>", {class: "label"});
        span.text(structure.name);
        li.append(span);
        $("#structuresContainer").append(li);
      });

      jQuery.each(groups, (index, group) => {
        li = $("<li>");
        li.data("data", group.toHTML());
        span = $("<span>", {class: "label"});
        span.text(group.name);
        li.append(span);
        $("#groupsContainer").append(li);
      });

      that.draggables = $("#componentsContainer, #structuresContainer, #groupsContainer").children();
    },
    newPLB() {
      const editable = $("#editable-area");

      this.draggables.draggable({
        opacity: 0.5,
        appendTo: editable,
        containment: editable,
        helper: "clone",
        start() {
          editable.content('initDroppables');
        },
        stop() {
          editable.find(".droppables-container").remove();
          editable.find(".droppables-container-nested").remove();
        }
      });
    }
  });

  div.toolbox({debug: false});
  div.toolbox("newPLB");
}