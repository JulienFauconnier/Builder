import Tool from "./tool";
import * as template from "./template";

/**
 * Initialize Toolbox widget (fill left column with blocks)
 */
function initModels() {
  const components = Tool.initComponents();
  const structures = Tool.initStructures(components);
  const groups = Tool.initGroups(components, structures);

  jQuery.each(components, (index, component) => {
    let li = $("<li>");
    li.data("data", component.toHTML());
    let span = $("<span>", {class: "draggable-model"});
    span.text(component.name);
    li.append(span);
    $(".componentsContainer").append(li);
  });

  jQuery.each(structures, (index, structure) => {
    let li = $("<li>");
    li.data("data", structure.toHTML());
    let span = $("<span>", {class: "draggable-model"});
    span.text(structure.name);
    li.append(span);
    $(".structuresContainer").append(li);
  });

  jQuery.each(groups, (index, group) => {
    let li = $("<li>");
    li.data("data", group.toHTML());
    let span = $("<span>", {class: "draggable-model"});
    span.text(group.name);
    li.append(span);
    $(".groupsContainer").append(li);
  });

  return $(".componentsContainer, .structuresContainer, .groupsContainer").children();
}

/**
 *
 */
export default function initToolbox() {
  const dropZone = $(".drop-zone");
  const Models = initModels();

  Models.draggable({
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
}