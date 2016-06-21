/*
 * Paramètres des Types et Classes éditables
 */

export let paramList = {
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

export let optList = {
  "font-weight": ["normal", "bold", "bolder", "lighter", "initial", "inherit"],
  "text-align": ["left", "right", "center", "justify", "initial", "inherit"],
  "text-transform": ["none", "capitalize", "uppercase", "lowercase", "initial", "inherit"]
};

/*
 * Liste des Options
 */
export function initOptions(select, default_option) {
  let options = "";
  for (let i = 0; i < optList[select].length; i++) {
    options += "<option value='" + optList[select][i] + "' ";
    if (default_option === optList[select][i]) {
      options += "selected"
    }
    options += ">" + optList[select][i] + "</option>";
  }
  return options;
}

/*
 * Assignation des champs
 */
/*
 $("dl[id='toolbox'] input,select,textarea").on("change input", function () {
 var node = $(this).parent().parent().parent().attr("name");
 if (!data['children'].hasOwnProperty(node)) {
 data['children'][node] = {};
 }
 if (!data['children'][node].hasOwnProperty('attributes')) {
 data['children'][node]['attributes'] = {};
 }
 if (!data['children'][node]['attributes'].hasOwnProperty($(this).attr("data-css"))) {
 data['children'][node]['attributes'][$(this).attr("data-css")] = null;
 }
 data['children'][node]['attributes'][$(this).attr("data-css")] = $(this).val();
 if (data['children'][node]['attributes'][$(this).attr("data-css")] == "") {
 delete data['children'][node]['attributes'][$(this).attr("data-css")];
 }
 //reloadCSS();
 });
 */