import Tool from "./tool";
import * as template from "./template";

const toolbox = ((() => {
  /**
   * Initialize Toolbox widget (fill left column with blocks)
   */
  let container;

  const initModels = () => {
    const components = Tool.initComponents();
    const structures = Tool.initStructures(components);
    const groups = Tool.initGroups(components, structures);

    jQuery.each(components, (index, component) => {
      const li = $("<li>");
      li.data("data", component.toHTML());
      const span = $("<span>", {class: "draggable-model"});
      span.text(component.name);
      li.append(span);
      $(".componentsContainer").append(li);
    });

    jQuery.each(structures, (index, structure) => {
      const li = $("<li>");
      li.data("data", structure.toHTML());
      const span = $("<span>", {class: "draggable-model"});
      span.text(structure.name);
      li.append(span);
      $(".structuresContainer").append(li);
    });

    jQuery.each(groups, (index, group) => {
      const li = $("<li>");
      li.data("data", group.toHTML());
      const span = $("<span>", {class: "draggable-model"});
      span.text(group.name);
      li.append(span);
      $(".groupsContainer").append(li);
    });

    container = $(".componentsContainer, .structuresContainer, .groupsContainer").children();
  };

  /**
   *
   */
  const initToolbox = (dropZone) => {
    initModels();

    container.draggable({
      opacity: 0.5,
      appendTo: dropZone,
      containment: dropZone,
      helper: "clone",
      start() {
        dropZone.dropzone('initDroppables');
      },
      stop() {
        dropZone.find(".droppables-container").remove();
        dropZone.find(".droppables-container-nested").remove();
      }
    });

    $(".selector").on("change", () => {
    });

    $(".submit-template").on("click", () => {
      template.exportTemplate($(".drop-zone"));
    });

    $(".set-template").on("click", () => {
      template.importTemplate();
    });
  };

  return {
    init: initToolbox
  };
}))();

export default toolbox;