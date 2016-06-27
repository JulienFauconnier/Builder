import * as shared from "./shared";
import rq from "./requirement";
import getCSSValues from "./css";

export {createDroppables, firstDroppable};

/**
 *
 * @param nestedDroppablesContainer
 */
function createAddToNestedDroppables(nestedDroppablesContainer) {
  $(".columns.nested-container").each(function () {
    $(this).children().each(function () {
      if ($(this).is(":first-child")) {
        var droppableRowBefore = $("<div>", {
          class: "droppable new-nested-before"
        }).css(getCSSValues("newNestedBefore1", $(this)));
        droppableRowBefore.data("row", $(this));
        droppableRowBefore.data("insertFunction", $(this).insertBefore);
        nestedDroppablesContainer.append(droppableRowBefore);
      } else {
        let droppableRowBefore = $("<div>", {
          class: "droppable new-nested-before"
        }).css(getCSSValues("newNestedBefore2", $(this)));
        droppableRowBefore.data("row", $(this));
        droppableRowBefore.data("insertFunction", $(this).insertBefore);
        nestedDroppablesContainer.append(droppableRowBefore);
      }

      if ($(this).is(":last-child")) {
        const droppableRowAfter = $("<div>", {
          class: "droppable new-nested-after"
        }).css(getCSSValues("newNestedAfter", $(this)));
        droppableRowAfter.data("row", $(this));
        droppableRowAfter.data("insertFunction", $(this).insertAfter);
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

  for (const draggableContainer of draggablesContainer) {
    if (shared.hasOneChildOnly($(draggableContainer)) || rq.checkColumnLevel($(draggableContainer))) {
      // Jump to next iteration: because we move a single element
      return true;
    }

    if (!shared.hasOneChildOnly($(draggableContainer).prev(".row.draggables-container"))) {
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
  }
}

/**
 *
 * @param droppablesContainer
 */
function createColumnsDroppables(droppablesContainer) {
  const draggables = $(".draggable").not(".drag-active, .ui-draggable-dragging");

  for (const draggable of draggables) {
    if (!rq.checkColumnLevel($(draggable)) && !rq.checkMaximumColumnsByRow($(draggable).parent())) {
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
  }
}

/**
 /**
 *
 * @param droppablesContainer
 */
function createNestingDroppables(droppablesContainer) {
  const draggables = $(".draggable").not(".drag-active, .ui-draggable-dragging");

  for (const draggable of draggables) {
    if ($(draggable).siblings().length > 0 && !rq.checkColumnLevel($(draggable)) && !rq.isColumnContainingRow($(draggable))) {
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
  }
}

/**
 * Call all above functions in order to display Dropzones on Drag
 * @param editable
 */
function createDroppables(editable) {
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
function firstDroppable(editable) {
  const droppablesContainer = $("<div>", {class: "droppables-container"});

  const droppableRow = $("<div>", {
    class: "droppable new-row"
  }).css(getCSSValues("newRow", editable));

  droppableRow.data("row", editable);
  droppableRow.data("insertFunction", $(this).appendTo);
  droppablesContainer.append(droppableRow);

  droppablesContainer.appendTo(editable);
}