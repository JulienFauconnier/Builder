/**
 *
 * @param row
 * @returns {boolean}
 */
export function hasOneChildOnly(row) {
  return ((row.children().not(".ui-draggable-dragging").length === 1)
  && (row.children(".ui-draggable-dragging").length === 1));
}
