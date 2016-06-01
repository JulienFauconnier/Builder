const DROPPABLE_SIZE = 10;

/**
 * This function is supposed to set (or return) columns "small" size
 * using content height.
 * If column's size greater than XXXpx -> small-12
 * Else:
 * @param row
 */
function defineColumnsPriority(row) {
}

/**
 *
 * @param column
 * @returns {boolean}
 */
function checkColumnLevel(column) {
  return (column.parent('.row').length > 1);
}

/**
 *
 * @param row
 * @returns {boolean}
 */
function checkMaximumColumnsByRow(row) {
  return (row.children().not(".ui-draggable-dragging, .drag-active").length > 3);
}

/**
 *
 * @param column
 * @returns {boolean}
 */
function isColumnContainingRow(column) {
  return (column.children('.row').length > 0);
}

/**
 *
 * @param row
 * @returns {boolean}
 */
function hasOneChildOnly(row) {
  return ((row.children().not(".ui-draggable-dragging").length === 1)
  && (row.children(".ui-draggable-dragging").length === 1));
}


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

  if (hasOneChildOnly(origin)) {
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
  if (!hasOneChildOnly(origin) && type === "row") {
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

/**
 *
 * @param elementPosition
 * @param element
 * @returns {*}
 */
function getCSSValues(elementPosition, element) {
  let parameters;
  const elementWidth = parseInt(element.css("width"));
  const elementHeight = parseInt(element.css("height"));
  const elementParentHeight = parseInt(element.parent().css("height"));
  const elementTop = element.offset().top;
  const elementLeft = element.offset().left;

  switch (elementPosition) {
    case "newRow":
      parameters = {
        top: elementTop,
        left: elementLeft,
        width: element.css("width"),
        height: element.css("height")
      };
      break;
    case "newNestedBefore1":
      parameters = {
        top: elementTop - (DROPPABLE_SIZE / 2) + 20,
        left: elementLeft,
        width: element.css("width")
      };
      break;
    case "newNestedBefore2":
      parameters = {
        top: elementTop - (DROPPABLE_SIZE / 2),
        left: elementLeft,
        width: element.css("width")
      };
      break;
    case "newNestedAfter":
      parameters = {
        top: elementTop + (+(elementHeight)) - (DROPPABLE_SIZE / 2) - 20,
        left: elementLeft,
        width: element.css("width")
      };
      break;
    case "newRowBefore":
      parameters = {
        top: elementTop - (DROPPABLE_SIZE / 2),
        left: elementLeft,
        width: element.css("width")
      };
      break;
    case "newRowAfter":
      parameters = {
        top: elementTop + (+(elementHeight)) - (DROPPABLE_SIZE / 2),
        left: elementLeft,
        width: element.css("width")
      };
      break;
    case "newColumnBefore":
      parameters = {
        top: elementTop + (DROPPABLE_SIZE / 2),
        left: elementLeft - (DROPPABLE_SIZE),
        height: `${elementParentHeight - DROPPABLE_SIZE}px`
      };
      break;
    case "newColumnAfter":
      parameters = {
        top: elementTop + (DROPPABLE_SIZE / 2),
        left: elementLeft + (+(elementWidth) - (DROPPABLE_SIZE)),
        height: `${elementParentHeight - DROPPABLE_SIZE}px`
      };
      break;
    case "newInsideAbove":
      parameters = {
        top: elementTop + (DROPPABLE_SIZE / 2),
        left: elementLeft + DROPPABLE_SIZE,
        width: `${elementWidth - (DROPPABLE_SIZE * 2)}px`,
        height: `${elementParentHeight / 2.5}px`
      };
      break;
    case "newInsideBelow":
      parameters = {
        top: elementTop - (elementParentHeight / 3) + (+(elementParentHeight * 0.9)),
        left: elementLeft + DROPPABLE_SIZE,
        width: `${elementWidth - (DROPPABLE_SIZE * 2)}px`,
        height: `${elementParentHeight / 2.5}px`
      };
      break;
    case "handleBefore":
      parameters = {
        top: elementTop + (DROPPABLE_SIZE / 2),
        left: elementLeft - (DROPPABLE_SIZE),
        height: `${elementHeight - DROPPABLE_SIZE}px`
      };
      break;
    case "handleAfter":
      parameters = {
        top: elementTop + (DROPPABLE_SIZE / 2),
        left: elementLeft + (+(elementWidth) - (DROPPABLE_SIZE)),
        height: `${elementHeight - DROPPABLE_SIZE}px`
      };
      break;
  }
  return parameters;
}

/**
 *
 * @param nestedDroppablesContainer
 */
function createAddToNestedDroppables(nestedDroppablesContainer) {
  const nestedContainers = $(".columns.nested-container");
  let droppables;

  jQuery.each(nestedContainers, (index, nestedContainer) => {
    droppables = nestedContainer.children();
    jQuery.each(droppables, (index, droppable) => {
      if ($(droppable).is(":first-child")) {
        var droppableRowBefore = $("<div>", {
          class: "droppable new-nested-before"
        }).css(getCSSValues("newNestedBefore1", $(droppable)));
        droppableRowBefore.data("row", $(droppable));
        droppableRowBefore.data("insertFunction", $(droppable).insertBefore);
        nestedDroppablesContainer.append(droppableRowBefore);
      } else {
        let droppableRowBefore = $("<div>", {
          class: "droppable new-nested-before"
        }).css(getCSSValues("newNestedBefore2", $(droppable)));
        droppableRowBefore.data("row", $(droppable));
        droppableRowBefore.data("insertFunction", $(droppable).insertBefore);
        nestedDroppablesContainer.append(droppableRowBefore);
      }
      if ($(droppable).is(":last-child")) {
        const droppableRowAfter = $("<div>", {
          class: "droppable new-nested-after"
        }).css(getCSSValues("newNestedAfter", $(droppable)));
        droppableRowAfter.data("row", $(droppable));
        droppableRowAfter.data("insertFunction", $(droppable).insertAfter);
        nestedDroppablesContainer.append(droppableRowAfter);
      }
    });
  });
}

/**
 *
 * @param droppablesContainer
 */
function createRowDroppables(droppablesContainer) {
  const draggablesContainer = $(".row.draggables-container");

  jQuery.each(draggablesContainer, (index, draggableContainer) => {
    if (hasOneChildOnly($(draggableContainer)) || checkColumnLevel($(draggableContainer))) {
      // Jump to next iteration: because we move a single element
      return true;
    }
    if (!hasOneChildOnly($(draggableContainer).prev(".row.draggables-container"))) {
      const droppableRowBefore = $("<div>", {
        class: "droppable new-row-before"
      }).css(getCSSValues("newRowBefore", $(draggableContainer)));
      droppableRowBefore.data("row", $(draggableContainer));
      droppableRowBefore.data("insertFunction", $(draggableContainer).insertBefore);
      droppablesContainer.append(droppableRowBefore);
    }
    if ($(draggableContainer).next(".row.draggables-container").length === 0) {
      const droppableRowAfter = $("<div>", {
        class: "droppable new-row-after"
      }).css(getCSSValues("newRowAfter", $(draggableContainer)));
      droppableRowAfter.data("row", $(draggableContainer));
      droppableRowAfter.data("insertFunction", $(draggableContainer).insertAfter);
      droppablesContainer.append(droppableRowAfter);
    }
  });
}

/**
 *
 * @param droppablesContainer
 */
function createColumnsDroppables(droppablesContainer) {
  const draggables = $(".draggable").not(".drag-active, .ui-draggable-dragging");

  jQuery.each(draggables, (index, draggable) => {
    if (!checkColumnLevel($(draggable)) && !checkMaximumColumnsByRow($(draggable).parent())) {
      if ($(draggable).is(':first-child')) {
        const droppableColumnBefore = $("<div>", {
          class: "droppable new-column-before"
        }).css(getCSSValues("newColumnBefore", $(draggable)));
        droppableColumnBefore.data("column", $(draggable));
        droppableColumnBefore.data("insertFunction", $(draggable).insertBefore);
        droppablesContainer.append(droppableColumnBefore);
      }

      if (!($(draggable).next().hasClass('drag-active'))) {
        const droppableColumnAfter = $("<div>", {
          class: "droppable new-column-after"
        }).css(getCSSValues("newColumnAfter", $(draggable)));
        droppableColumnAfter.data("column", $(draggable));
        droppableColumnAfter.data("insertFunction", $(draggable).insertAfter);
        droppablesContainer.append(droppableColumnAfter);
      }
    }
  });
}

/**
 /**
 *
 * @param droppablesContainer
 */
function createNestingDroppables(droppablesContainer) {
  const draggables = $(".draggable").not(".drag-active, .ui-draggable-dragging");

  jQuery.each(draggables, (index, draggable) => {
    if ($(draggable).siblings().length > 0 && !checkColumnLevel($(draggable)) && !isColumnContainingRow($(draggable))) {
      const droppableRowAbove = $("<div>", {
        class: "droppable new-inside-above"
      }).css(getCSSValues("newInsideAbove", $(draggable)));
      droppableRowAbove.data("column", $(draggable));
      droppableRowAbove.data("insertFunction", $(draggable).prepend);
      droppablesContainer.append(droppableRowAbove);

      const droppableRowBelow = $("<div>", {
        class: "droppable new-inside-below"
      }).css(getCSSValues("newInsideBelow", $(draggable)));
      droppableRowBelow.data("column", $(draggable));
      droppableRowBelow.data("insertFunction", $(draggable).append);
      droppablesContainer.append(droppableRowBelow);
    }
  });
}

/**
 *
 * @param editable
 */
export function createDroppables(editable) {
  const droppablesContainer = $("<div>", {class: "droppables-container"}),
    nestedDroppablesContainer = $("<div>", {class: "droppables-container-nested"});

  editable.append(droppablesContainer);
  editable.append(nestedDroppablesContainer);

  createRowDroppables(droppablesContainer);
  createColumnsDroppables(droppablesContainer);
  createNestingDroppables(droppablesContainer);
  createAddToNestedDroppables(nestedDroppablesContainer);
}

/**
 *
 * @param editable
 */
export function firstDroppable(editable) {
  const droppablesContainer = $("<div>", {class: "droppables-container"});

  const droppableRow = $("<div>", {
    class: "droppable new-row"
  }).css(getCSSValues("newRow", editable));

  droppableRow.data("row", editable);
  droppableRow.data("insertFunction", $(this).appendTo);
  droppablesContainer.append(droppableRow);

  droppablesContainer.appendTo(editable);
}
