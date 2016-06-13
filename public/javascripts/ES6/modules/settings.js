/*
 * Paramètres des Types et Classes éditables
 */

let paramList = {
  'P': ["color", "font-size", "margin", "padding", "letter-spacing", "line-height", "text-align",
    "text-transform", "text-shadow", "font-weight"],
  'A': ["background-color", "border", "border-radius", "color", "margin", "padding", "letter-spacing",
    "line-height", "text-align", "text-transform", "text-shadow", "font-weight"],
  'H1': ["color", "background-color", "font-size", "margin", "padding", "letter-spacing", "line-height",
    "text-align", "text-transform", "text-shadow", "font-weight"],
  'H2': ["color", "background-color", "font-size", "margin", "padding", "letter-spacing", "line-height",
    "text-align", "text-transform", "text-shadow", "font-weight"],
  'H3': ["color", "background-color", "font-size", "margin", "padding", "letter-spacing", "line-height",
    "text-align", "text-transform", "text-shadow", "font-weight"],
  'H4': ["color", "background-color", "font-size", "margin", "padding", "letter-spacing", "line-height",
    "text-align", "text-transform", "text-shadow", "font-weight"],
  'H5': ["color", "background-color", "font-size", "margin", "padding", "letter-spacing", "line-height",
    "text-align", "text-transform", "text-shadow", "font-weight"],
  'H6': ["color", "background-color", "font-size", "margin", "padding", "letter-spacing", "line-height",
    "text-align", "text-transform", "text-shadow", "font-weight"],
  'DIV': ["background", "margin", "padding", "border", "border-radius", "box-shadow"],
  'IMG': ["margin", "border-radius", "opacity", "width"],
  'LABEL': ["color", "font-size", "text-shadow", "text-transform"],
  'INPUT': ["background-color", "color", "font-size", "border", "border-radius", "box-shadow", "font-size",
    "margin", "padding", "text-align"],
  'SELECT': ["background-color", "border", "border-radius", "box-shadow", "font-size", "margin", "padding",
    "text-align"],
  'TEXTAREA': ["background-color", "border", "border-radius", "box-shadow", "font-size", "height", "margin",
    "padding", "text-align"],
  'OPTION': ["background-color", "color", "font-size", "text-transform"],
  'BUTTON': ["background-color", "color", "font-size", "margin", "padding", "border", "border-radius",
    "box-shadow", "font-weight", "text-transform", "text-shadow", "opacity"]
};

/**
 *
 * @returns {{P: string[], A: string[], H1: string[], H2: string[], H3: string[], H4: string[], H5: string[], H6: string[], DIV: string[], IMG: string[], LABEL: string[], INPUT: string[], SELECT: string[], TEXTAREA: string[], OPTION: string[], BUTTON: string[]}}
 */
export function getCustomizables() {
  return paramList;
}

let optList = {
  'font-weight': ["normal", "bold", "bolder", "lighter", "initial", "inherit"],
  'text-align': ["left", "right", "center", "justify", "initial", "inherit"],
  'text-transform': ["none", "capitalize", "uppercase", "lowercase", "initial", "inherit"]
};

/*
 * Liste des Options
 */
export function optionList(select, default_option) {
  var options = "";
  for (var i = 0; i < optList[select].length; i++) {
    options += "<option value='" + optList[select][i] + "' ";
    if (default_option === optList[select][i]) {
      options += "selected"
    }
    options += ">" + optList[select][i] + "</option>";
  }
  return options;
}

/*
 * Liste des Outils
 */
/*
function toolList(target, typet) {
  var contenu = "";
  for (var i = 0; i < paramList[typet].length; i++) {
    if (paramList[typet][i] === "text-align" || paramList[typet][i] === "text-transform" || paramList[typet][i] === "font-weight") {
      contenu += "<label>" + paramList[typet][i] + "<select data-css='" + paramList[typet][i] + "'>" + optionList(paramList[typet][i], $("#result").contents().find(target).css(paramList[typet][i])) + "</select></label>";
    } else if (paramList[typet][i] === "background") {
      contenu += "<label>" + paramList[typet][i] + "<textarea data-css='" + paramList[typet][i] + "' placeholder='" + $("#result").contents().find(target).css(paramList[typet][i]) + "'>" + $("#result").contents().find(target).css(paramList[typet][i]) + "</textarea></label>";
    } else {
      contenu += "<label>" + paramList[typet][i] + "<input type='text' data-css='" + paramList[typet][i] + "' value='" + $("#result").contents().find(target).css(paramList[typet][i]) + "' placeholder='" + $("#result").contents().find(target).css(paramList[typet][i]) + "'></label>";
    }
  }
  return contenu;
}
 */

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