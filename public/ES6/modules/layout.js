import * as shared from "./shared";
import * as resp from "./responsive";

/**
 *
 * @param row
 */
export function updateRow(row) {
  const childrenCount = row.children().not(".ui-draggable-dragging").length,
    columns = row.children();

  jQuery.each(columns, (index, column) => {
    resp.setColumnSize($(column), childrenCount);
  });
}

/**
 *
 * @param containers
 * @param type
 * @returns {Array}
 */
function prepareContainersOperations(containers, type) {
  const origin = containers[0],
    target = containers[1],
    functionsList = [];

  if (shared.hasOneChildOnly(origin)) {
    functionsList.push(origin.remove);
  }
  if (type === "column" && origin[0] !== target[0]) {
    if (functionsList.length !== 1) {
      functionsList.push(() => {
        updateRow(origin);
      });
    }
    functionsList.push(() => {
      updateRow(target);
    });
  }
  if (!shared.hasOneChildOnly(origin) && type === "row") {
    functionsList.push(() => {
      updateRow(origin);
    });
  }
  return functionsList;
}

/**
 *
 * @param droppable
 * @param ui
 */
export function newRow(droppable, ui) {
  const containers = [ui.draggable.parent(), droppable.data("row").parent()],
    updateList = prepareContainersOperations(containers, "row"),
    draggablesContainer = $("<div>", {class: "row draggables-container"});

  const draggable = ui.draggable.detach();

  draggablesContainer.append(draggable);
  droppable.data("insertFunction").apply(draggablesContainer, droppable.data("row"));
  updateRow(draggablesContainer);

  jQuery.each(updateList, (index, update) => {
    update.call(containers[index]);
  });
}

/**
 *
 * @param droppable
 * @param ui
 */
export function newColumn(droppable, ui) {
  const containers = [ui.draggable.parent(), droppable.data("column").parent()],
    updateList = prepareContainersOperations(containers, "column");

  const draggable = ui.draggable.detach();

  droppable.data("insertFunction").apply(draggable, droppable.data("column"));

  jQuery.each(updateList, (index, update) => {
    update.call(containers[index]);
  });
}

/**
 *
 * @param droppable
 * @param draggable
 * @returns {*[]}
 */
function wrappingRowIntoColumn(droppable, draggable) {
  const oldColumn = droppable.data("column"),
    newRow1 = $("<div>", {class: "row"}),
    newRow2 = $("<div>", {class: "row"}),
    replacementColumn = $("<div>", {class: oldColumn.attr("class")});

  replacementColumn.addClass("nested-container");
  resp.setColumnSize(oldColumn, 1);
  resp.setColumnSize(draggable, 1);
  newRow2.append(draggable);
  oldColumn.wrap(replacementColumn);
  oldColumn.wrap(newRow1);

  return [oldColumn, newRow2];
}

/**
 *
 * @param droppable
 * @param ui
 */
export function newInside(droppable, ui) {
  const containers = [ui.draggable.parent(), droppable.data("column").parent()],
    updateList = prepareContainersOperations(containers, "column");

  const draggable = ui.draggable.detach();

  const wrapped = wrappingRowIntoColumn(droppable, draggable);

  droppable.data("insertFunction").apply(wrapped[0].parent().parent(), wrapped[1]);

  jQuery.each(updateList, (index, update) => {
    update.call(containers[index]);
  });
}

/**
 *
 * @param droppable
 * @param ui
 */
export function newNested(droppable, ui) {
  const containers = [ui.draggable.parent(), droppable.data("row").parent()],
    updateList = prepareContainersOperations(containers, "row"),
    draggablesContainer = $("<div>", {class: "row"});

  const draggable = ui.draggable.detach();

  draggablesContainer.append(draggable);
  droppable.data("insertFunction").apply(draggablesContainer, droppable.data("row"));
  updateRow(draggablesContainer);

  jQuery.each(updateList, (index, update) => {
    update.call(containers[index]);
  });
}
