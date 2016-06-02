import * as shared from "./shared";

/**
 *
 * @param count
 * @returns {{small: number, medium: number, large: number}}
 */
function getDefaultValues(count) {
  let values;

  switch (count) {
    case 1:
      values = {"small": 12, "medium": 12, "large": 12};
      break;
    case 2:
      values = {"small": 6, "medium": 6, "large": 6};
      break;
    case 3:
      values = {"small": 12, "medium": 4, "large": 4};
      break;
    case 4:
      values = {"small": 12, "medium": 3, "large": 3};
      break;
    default:
      break;
  }
  return values;
}

/**
 *
 * @param column
 * @returns {*}
 */
export function getColumnSize(column) {
  const size = {};
  const cls = column.attr('class').split(' ');
  for (let i = 0; i < cls.length; i++) {
    if (cls[i].indexOf("small-") > -1) {
      size.small = cls[i];
    }
    if (cls[i].indexOf("medium-") > -1) {
      size.medium = cls[i];
    }
    if (cls[i].indexOf("large-") > -1) {
      size.large = cls[i];
    }
  }
  return size;
}

/**
 *
 * @param column
 * @param size
 */
export function setColumnSize(column, size) {
  if (size.small === undefined) {
    size.small = getColumnSize(column).small;
    size.small = size.small.slice(6, size.small.length);
  }

  column.removeClass((index, css) => (css.match(/(^|\s)small-\S+/g) || []).join(' '));
  column.removeClass((index, css) => (css.match(/(^|\s)medium-\S+/g) || []).join(' '));
  column.removeClass((index, css) => (css.match(/(^|\s)large-\S+/g) || []).join(' '));
  column.addClass(`small-${size.small} medium-${size.medium} large-${size.large}`);
}

/**
 *
 * @param row
 */
export function updateRow(row) {
  const childrenCount = row.children().not(".ui-draggable-dragging").length,
    columns = row.children();

  jQuery.each(columns, (index, column) => {
    setColumnSize($(column), getDefaultValues(childrenCount));
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
  setColumnSize(oldColumn, getDefaultValues(1));
  setColumnSize(draggable, getDefaultValues(1));
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

