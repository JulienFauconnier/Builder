export default class Requirement {
  /**
   * This function is supposed to set (or return) columns "small" size
   * using content height.
   * If column's size greater than XXXpx -> small-12
   * Else:
   * @param row
   */
  static defineColumnsPriority(row) {
  }

  /**
   *
   * @param column
   * @returns {boolean}
   */
  static checkColumnLevel(column) {
    return (column.parent('.row').length > 1);
  }

  /**
   *
   * @param row
   * @returns {boolean}
   */
  static checkMaximumColumnsByRow(row) {
    return (row.children().not(".ui-draggable-dragging, .drag-active").length > 3);
  }

  /**
   *
   * @param column
   * @returns {boolean}
   */
  static isColumnContainingRow(column) {
    return (column.children('.row').length > 0);
  }
}