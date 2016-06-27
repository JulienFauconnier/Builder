export {getParameters, getOptions, initOptions};

const paramList = {
  "P": ["color", "font-size", "margin", "padding", "letter-spacing", "line-height", "text-align",
    "text-transform", "text-shadow", "font-weight"],
  "A": ["background-color", "border", "border-radius", "color", "margin", "padding", "letter-spacing",
    "line-height", "text-align", "text-transform", "text-shadow", "font-weight"],
  "H1": ["color", "background-color", "font-size", "margin", "padding", "letter-spacing", "line-height",
    "text-align", "text-transform", "text-shadow", "font-weight"],
  "H2": ["color", "background-color", "font-size", "margin", "padding", "letter-spacing", "line-height",
    "text-align", "text-transform", "text-shadow", "font-weight"],
  "H3": ["color", "background-color", "font-size", "margin", "padding", "letter-spacing", "line-height",
    "text-align", "text-transform", "text-shadow", "font-weight"],
  "H4": ["color", "background-color", "font-size", "margin", "padding", "letter-spacing", "line-height",
    "text-align", "text-transform", "text-shadow", "font-weight"],
  "H5": ["color", "background-color", "font-size", "margin", "padding", "letter-spacing", "line-height",
    "text-align", "text-transform", "text-shadow", "font-weight"],
  "H6": ["color", "background-color", "font-size", "margin", "padding", "letter-spacing", "line-height",
    "text-align", "text-transform", "text-shadow", "font-weight"],
  "DIV": ["background", "margin", "padding", "border-style", "border-width", "border-color", "border-radius", "box-shadow"],
  "IMG": ["margin", "border-radius", "opacity", "width"],
  "LABEL": ["color", "font-size", "text-shadow", "text-transform"],
  "INPUT": ["background-color", "color", "font-size", "border", "border-radius", "box-shadow", "font-size",
    "margin", "padding", "text-align"],
  "SELECT": ["background-color", "border", "border-radius", "box-shadow", "font-size", "margin", "padding",
    "text-align"],
  "TEXTAREA": ["background-color", "border", "border-radius", "box-shadow", "font-size", "height", "margin",
    "padding", "text-align"],
  "OPTION": ["background-color", "color", "font-size", "text-transform"],
  "BUTTON": ["background-color", "color", "font-size", "margin", "padding", "border", "border-radius",
    "box-shadow", "font-weight", "text-transform", "text-shadow", "opacity"]
};

const optList = {
  "font-weight": ["normal", "bold", "bolder", "lighter", "initial", "inherit"],
  "text-align": ["left", "right", "center", "justify", "initial", "inherit"],
  "text-transform": ["none", "capitalize", "uppercase", "lowercase", "initial", "inherit"]
};


/**
 *
 */
function getParameters() {
  return paramList;
}

/**
 *
 */
function getOptions() {
  return optList;
}

/**
 * Init Options List
 *
 * @param select
 * @param default_option
 * @returns {string}
 */
function initOptions(select, default_option) {
  let options = "";
  for (let i = 0; i < optList[select].length; i++) {
    options += `<option value='${optList[select][i]}' `;
    if (default_option === optList[select][i]) {
      options += "selected"
    }
    options += `>${optList[select][i]}</option>`;
  }
  return options;
}
