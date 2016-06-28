import * as resp from "./responsive";
import Content from "./content";
import builder from "xmlbuilder";

export {exportTemplate, importTemplate};

const classEx = ["container", "row", "columns"];
const tagEX = ["P", "H1", "H2", "H3", "H4", "H5", "H6"];

let backup;

/**
 *
 * @param node
 * @returns {{}}
 * @constructor
 */
function DOMtoJSON(node = this) {
  const obj = {};
  let nodeType;
  let nodeSize = false;

  //console.log($(node).attr());

  if ($(node).hasClass("editable")) {
    nodeType = "container";
  }
  else if ($(node).hasClass("row")) {
    nodeType = "row";
  }
  else if ($(node).hasClass("columns")) {
    nodeType = "columns";
    nodeSize = true;
  }
  else {
    nodeType = $(node).prop("tagName");
  }

  obj[nodeType] = {};

  obj[nodeType]["@"] = {};

  if (nodeSize) {
    const size = resp.getColumnSize($(node));
    obj[nodeType]["@"].small = parseInt(size.large.slice(6, size.large.length)) || 12;
    obj[nodeType]["@"].medium = parseInt(size.medium.slice(7, size.medium.length)) || obj[nodeType]["@"].small;
    obj[nodeType]["@"].large = parseInt(size.large.slice(6, size.large.length)) || obj[nodeType]["@"].medium;
  }

  obj[nodeType]["@"].class = $(node).prop("class");

  if (classEx.indexOf(nodeType) === -1) {
    if (node.hasAttributes()) {
      /*
       for (let attribute in node.attributes[0]) {
       console.log(attribute);
       obj[nodeType]["@"][attribute.name] = attribute.value;
       }
       */

      jQuery.each(node.attributes, (i, attribute) => {
        obj[nodeType]["@"][attribute.name] = attribute.value;
      });
    }
  }

  const childNodes = $(node).children();

  obj[nodeType]["#"] = [];
  if (childNodes.length > 0 && nodeType !== "P") {
    for (const childNode of childNodes) {
      if ((($(childNode).attr("class")) || []).indexOf("js-off-canvas-exit") === -1)
        obj[nodeType]["#"].push(DOMtoJSON(childNode));
    }
  }
  else {
    if (nodeType === "P") {
      obj[nodeType]["#"] = $(node).html();
    }
    else {
      obj[nodeType]["#"] = $(node).text();
    }
  }

  return obj;
}

function DOMtoJSON_test(node = this) {
  const cArray = [];
  let nodeType;

  if ($(node).hasClass("editable") || ($(node).children().first().hasClass("row"))) {
    nodeType = "row";
  }
  else if ($(node).hasClass("row")) {
    nodeType = "columns";
  }

  const childNodes = $(node).children().not(".js-off-canvas-exit, .ui-resizable-handle");

  const insideObj = {};

  if (childNodes.length > 0 && (tagEX).indexOf(nodeType) === -1) {
    const ttt = [];
    for (const childNode of childNodes) {
      if (nodeType !== undefined) {
        ttt.push(DOMtoJSON_test(childNode));
        insideObj[nodeType] = ttt;
      }
      else {
        ttt.push(DOMtoJSON_test(childNode));
        insideObj[$(childNode).prop("tagName")] = ttt;
      }
    }
  }
  else {
    if ((tagEX).indexOf(nodeType) !== -1) {
      insideObj["#text"] = $(node).html();
    }
    else {
      insideObj["#text"] = $(node).text();
    }
  }

  if ($(node).hasClass("columns")) {
    const size = resp.getColumnSize($(node));

    insideObj["@small"] = parseInt(size.large.slice(6, size.large.length)) || null;
    insideObj["@medium"] = parseInt(size.medium.slice(7, size.medium.length)) || insideObj["@small"];
    insideObj["@large"] = parseInt(size.large.slice(6, size.large.length)) || insideObj["@medium"];
  }

  insideObj["@class"] = $(node).prop("class");

  cArray.push(insideObj);

  return cArray;
}

/**
 *
 * @param json
 * @returns {*}
 */
function toXML(json) {
  return builder.create(json).end({pretty: true});
}

/**
 *
 * @param node
 */
function exportTemplate(node) {
  const obj = {
    container: [{
      row: [
        {
          columns: [
            {
              content: [
                {
                  tag: "h1",
                  class: "test2",
                  text: "pompompidou"
                },
                {
                  tag: "p",
                  class: "test1",
                  text: "lol"
                }
              ],
              '@class': "test",
              '@small': 4,
              '@medium': 4,
              '@large': 4
            },
            {
              H2: [{
                '@test': "lol",
                '#text': "lolilol2"
              }],
              P: [{
                '#text': "bla bla bla"
              }],
              '@class': "test",
              '@small': 4,
              '@medium': 4,
              '@large': 4
            },
            {
              H2: [{
                '@test': "lol",
                '#text': "lolilol3"
              }],
              P: [{
                '#text': "bla bla bla"
              }],
              '@class': "test",
              '@small': 4,
              '@medium': 4,
              '@large': 4
            }
          ]
        },
        {
          columns: [
            {
              H2: [{
                '@test': "lol",
                '#text': "lolilol4"
              }],
              P: [{
                '#text': "bla bla bla"
              }],
              '@class': "test",
              '@small': 4,
              '@medium': 4,
              '@large': 4
            },
            {
              H2: [{
                '@test': "lol",
                '#text': "lolilol5"
              }],
              P: [{
                '#text': "bla bla bla"
              }],
              '@class': "test",
              '@small': 4,
              '@medium': 4,
              '@large': 4
            },
            {
              H2: [{
                '@test': "lol",
                '#text': "lolilol6"
              }],
              P: [{
                '#text': "bla bla bla"
              }],
              '@class': "test",
              '@small': 4,
              '@medium': 4,
              '@large': 4
            }
          ]
        }
      ]
    }]
  };

  //backup = DOMtoJSON(node);

  //backup = {};

  //backup.container = DOMtoJSON_test(node);

  backup = DOMtoJSON(node);

  console.log(JSON.stringify(backup));
  //console.log(toXML(backup));
}

/**
 * FIXME: This function is not working anymore
 * @param array
 * @returns {Array}
 * @constructor
 */
function JSONtoDOM_test(array) {
  const node = [];

  for (const elem in array) {
    let tag;

    if (classEx.indexOf(elem) > -1) {
      tag = "div";
    }
    else {
      tag = $(elem).prop("tagName");
    }

    console.log(array[elem]);

    const elemAttributes = array[elem]["@class"] || {class: ""};
    const elemContent = array[elem]["#text"] || array[elem][0] || array[elem]["columns"] || array[elem]["row"];

    console.log(elemContent);

    const element = $(`<${tag}>`, {class: elemAttributes.class});

    if (elem === "columns") {
      element
        .addClass(`small-${array[elem]["@small"]} medium-${array[elem]["@medium"]} large-${array[elem]["@large"]}`);
    }

    if (Array.isArray(elemContent)) {
      for (const subElement in elemContent) {
        element.append(JSONtoDOM_test(elemContent[subElement]));
      }
    }
    else {
      element.append(elemContent);
    }

    node.push(element);
  }
  return node;
}

/**
 *
 * @param obj
 * @returns {Array}
 * @constructor
 */
function JSONtoDOM(obj) {
  const node = [];
  for (const testO in obj) {
    let tag;

    if (classEx.indexOf(testO) > -1)
      tag = "div";
    else
      tag = testO;

    const attributes = obj[testO]["@"] || {};
    const content = obj[testO]["#"];
    const element = $(`<${tag}>`, attributes);

    if (testO === "columns")
      element.addClass(`small-${attributes.small} medium-${attributes.medium} large-${attributes.large}`);

    if (Array.isArray(content)) {
      const tab = content;

      for (const sub in tab) {
        element.append(JSONtoDOM(tab[sub]));
      }
    }
    else {
      element.append(content);
    }
    node.push(element);
  }
  return node;
}

/**
 *
 */
function importTemplate() {
  const editable = $(".editable");
  //const testF = JSONtoDOM_test(backup.container);
  const testF = JSONtoDOM(backup);

  editable.children(".row").remove();
  editable.append(testF[0][0].childNodes);

  Content(editable);
}

/**
 *
 */
function inCSStoCSS() {
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
}

/**
 *
 */
function CSStoInCSS() {
  /*
   const res = $("#result");
   res.contents().find("*").removeAttr("style");
   for (let init = 0; init < 3; init++) {
   for (const target of data['children']) {
   if ((!target.match("^.") && !target.match("^#") && init == 0)
   || (target.match("^.") && init == 1)
   || (target.match("^#") && init == 2))
   for (const cssName of data['children'][target]['attributes'])
   res.contents().find(target).css(cssName, data['children'][target]['attributes'][cssName]);
   }
   }
   */
}
