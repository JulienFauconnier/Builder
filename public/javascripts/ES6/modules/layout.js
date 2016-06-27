import * as shared from "./shared";
import * as resp from "./responsive";

export {removeDiv, updateRow, newRow, newColumn, newInside, newNested};
export * from "./responsive"

/**
 * A simple (but awesome) recursive function to delete 'future-empty' after nesting
 * FIXME: Fix when removing by moving to another existing row
 * @param element
 * @returns {*}
 */
function removeDiv(element) {
  const eParent = element.parent();

  if (eParent.children().length < 2)
    element = removeDiv(eParent);

  return element;
}

/**
 * Update All Columns from a Row
 * @param row
 */
function updateRow(row) {
  const childrenCount = row.children().not(".ui-draggable-dragging").length,
    columns = row.children();

  for (const column of columns) {
    resp.setColumnSize($(column), childrenCount);
  }
}

/**
 * Generate and Return a list of actions after a Drag/Drop/Delete
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
 * Create a new Row on Drop
 * @param droppable
 * @param ui
 */
function newRow(droppable, ui) {
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
 * Create a new Column on Drop
 * @param droppable
 * @param ui
 */
function newColumn(droppable, ui) {
  const containers = [ui.draggable.parent(), droppable.data("column").parent()],
    updateList = prepareContainersOperations(containers, "column");

  const draggable = ui.draggable.detach();

  droppable.data("insertFunction").apply(draggable, droppable.data("column"));

  jQuery.each(updateList, (index, update) => {
    update.call(containers[index]);
  });
}

/**
 * Wrap an existing and new Row into one Column
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
 * Add a new Row inside a Wrap on Drop
 * @param droppable
 * @param ui
 */
function newInside(droppable, ui) {
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
function newNested(droppable, ui) {
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
