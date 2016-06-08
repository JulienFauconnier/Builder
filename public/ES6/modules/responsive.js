export {getColumnSize, setColumnSize};

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
  console.log();
  return values;
}

/**
 *
 * @param column
 * @param sizesList
 * @returns {*}
 */
function getColumnSize(column, sizesList) {
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
 * @param count
 * @param sizesList
 */
function setColumnSize(column, count, sizesList) {
  let size;

  if (Number.isInteger(count))
    size = getDefaultValues(count);
  else
    size = count;

  if (size.small === undefined) {
    size.small = getColumnSize(column).small;
    size.small = size.small.slice(6, size.small.length);
  }

  column.removeClass((index, css) => (css.match(/(^|\s)small-\S+/g) || []).join(' '));
  column.removeClass((index, css) => (css.match(/(^|\s)medium-\S+/g) || []).join(' '));
  column.removeClass((index, css) => (css.match(/(^|\s)large-\S+/g) || []).join(' '));
  column.addClass(`small-${size.small} medium-${size.medium} large-${size.large}`);
}
