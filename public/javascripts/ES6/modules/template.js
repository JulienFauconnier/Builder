import * as resp from "./responsive";

export {exportTemplate, importTemplate};

function exportTemplate(node) {
  /*
   jQuery.each(nodes, (index, node) => {
   window.console.log(node);
   });
   */

  //let test = toJSON(node);

  //let finalJSON = JSON.stringify(test, null, 2);

  window.console.log(JSON.stringify(toJSON(node)));
  //window.console.log(finalJSON);
}

function importTemplate() {
  const test = {
    "container": {
      "@": {"class": "off-canvas-content editable ui-selectable"},
      "#": [{
        "row": {
          "@": {"class": "row draggables-container"},
          "#": [{
            "columns": {
              "@": {
                "small": 4,
                "medium": 4,
                "large": 4,
                "class": "columns draggable small-12 medium-4 large-4 ui-draggable ui-resizable"
              },
              "#": [{
                "H1": {
                  "@": {"class": "tiny-mce"},
                  "#": "Wingardium Leviosa"
                }
              }]
            }
          }, {
            "columns": {
              "@": {
                "small": 4,
                "medium": 4,
                "large": 4,
                "class": "columns draggable ui-draggable ui-resizable small-12 medium-4 large-4"
              },
              "#": [{
                "H1": {
                  "@": {"class": "tiny-mce"},
                  "#": "Wingardium Leviosa"
                }
              }]
            }
          }, {
            "columns": {
              "@": {
                "small": 4,
                "medium": 4,
                "large": 4,
                "class": "columns draggable ui-draggable ui-selectee small-12 medium-4 large-4"
              }, "#": [{"H1": {"@": {"class": "tiny-mce"}, "#": "Wingardium Leviosa"}}]
            }
          }]
        }
      }]
    }
  };

  const testF = toDOM(test);

  $(".editable").replaceWith(testF);

  // FIXME: Initialization
}

function toJSON(node = this) {
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

  const childNodes = $(node).children();

  obj[nodeType]["#"] = [];
  if (childNodes.length > 0 && nodeType !== "P") {
    for (const childNode of childNodes) {
      if ($(node).not(".js-off-canvas-exit"))
        obj[nodeType]["#"].push(toJSON(childNode));
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

function toDOM(obj) {
  const node = [];
  for (const testO in obj) {
    let tag;

    if (testO === "container" || testO === "row" || testO === "columns")
      tag = "div";
    else
      tag = testO;

    const attributes = obj[testO]["@"];
    const content = obj[testO]["#"];
    const element = $(`<${tag}>`, {class: attributes.class});

    if (testO === "columns")
      element.addClass(`small-${attributes.small} medium-${attributes.medium} large-${attributes.large}`);

    if (Array.isArray(content)) {
      const tab = content;

      for (const sub in tab) {
        element.append(toDOM(tab[sub]));
      }
    }
    else {
      element.append(content);
    }
    node.push(element);
  }

  /*
   let node, nodeType = obj.nodeType;
   switch (nodeType) {
   case 1: //ELEMENT_NODE
   node = document.createElement(obj.tagName);
   var attributes = obj.attributes || [];
   for (let i = 0, len = attributes.length; i < len; i++) {
   let attr = attributes[i];
   node.setAttribute(attr[0], attr[1]);
   }
   break;
   case 3: //TEXT_NODE
   node = document.createTextNode(obj.nodeValue);
   break;
   case 8: //COMMENT_NODE
   node = document.createComment(obj.nodeValue);
   break;
   case 9: //DOCUMENT_NODE
   node = document.implementation.createDocument();
   break;
   case 10: //DOCUMENT_TYPE_NODE
   node = document.implementation.createDocumentType(obj.nodeName);
   break;
   case 11: //DOCUMENT_FRAGMENT_NODE
   node = document.createDocumentFragment();
   break;
   default:
   return node;
   }
   if (nodeType == 1 || nodeType == 11) {
   let childNodes = obj.childNodes || [];
   let i;
   let len = childNodes.length;
   for (i = 0; i < len; i++) {
   node.appendChild(toDOM(childNodes[i]));
   }
   }
   */

  return node;
}

/**
 *
 */
function reloadCSS(data) {
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
}

/**
 *
 */
$("#export").on("click", () => {
  ddlTemplate();
});

function ddlTemplate() {
  const a = document.createElement('a');
  const now = new Date(Date.now());
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  };

  a.setAttribute('download', `${document.domain}_${now.toLocaleDateString('fr-FR', options)}.json`);
  a.href = `data:application/json,${exportTemplate()}`;
  a.innerHTML = 'testing';
  a.style.display = 'none';
  document.body.appendChild(a);

  a.click();
}

/**
 *
 */
$("#import").on("click", () => {
  $("#fileInput").click();
  toDOM();
  reloadCSS();
});

/**
 * Fields Assignation
 */
function registerCC() {
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
