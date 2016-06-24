import * as resp from "./responsive";
import Content from "./content";

export {exportTemplate, importTemplate};

let builder = require('xmlbuilder');

let exclusion = ["container", "row", "columns"];

let backup;

/**
 *
 * @param node
 */
function exportTemplate(node) {
  backup = DOMtoJSON(node);

  console.log(JSON.stringify(backup));
  console.log(toXML(backup));

  var obj = {
    container: [{
      row: [
        {
          columns: [
            {
              H2: {
                '@test': "lol",
                '#text': "lolilol"
              },
              P: {
                '#text': "bla bla bla"
              },
              '@class': "test",
              '@small': 4,
              '@medium': 4,
              '@large': 4
            },
            {
              H2: [{
                '@test': "lol",
                '#text': "lolilol"
              }],
              P: {
                '#text': "bla bla bla"
              },
              '@class': "test",
              '@small': 4,
              '@medium': 4,
              '@large': 4
            },
            {
              H2: [{
                '@test': "lol",
                '#text': "lolilol"
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

  var builder = require('xmlbuilder');
  var root = builder.create(obj).end({pretty: true});

  console.log(JSON.stringify(obj));
  console.log(root);
}

function toXML(json) {
  return builder.create(json).end({pretty: true});
}

/**
 *
 */
function importTemplate() {
  const editable = $(".editable");
  const testF = JSONtoDOM(backup);

  editable.children(".row").remove();
  editable.append(testF[0][0].childNodes);

  Content(editable);
}

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

  if (exclusion.indexOf(nodeType) > -1) {
    jQuery.each($(node).attributes, function (i, attrib) {
      obj[nodeType]["@"][attrib.name] = attrib.value;
    });
  }

  const childNodes = $(node).children();

  obj[nodeType]["#"] = [];

  if (childNodes.length > 0 && nodeType !== "P") {
    for (const childNode of childNodes) {
      if (($(childNode).attr("class") || []).indexOf("js-off-canvas-exit") === -1)
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

    if (exclusion.indexOf(testO) > -1)
      tag = "div";
    else
      tag = testO;

    const attributes = obj[testO]["@"] || {class: ""};
    const content = obj[testO]["#"];
    const element = $(`<${tag}>`, {class: attributes.class});

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
