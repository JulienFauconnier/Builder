const DROPPABLE_SIZE = 10;

// TODO: Find a way to delete this b*******

/**
 *
 * @param elementPosition
 * @param element
 * @returns {*}
 */
export default function getParameters(elementPosition, element) {
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