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
  alert("Test");
}


function toJSON(node) {
  node = node || this;

  window.console.log(node);

  let obj = {};
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

  if (nodeSize) {
    let size = resp.getColumnSize($(node));
    obj.small = parseInt(size.small.slice(6, size.small.length));
    obj.large = parseInt(size.large.slice(6, size.large.length));
  }

  obj.class = node.classList;

  let childNodes = $(node).children();

  if (childNodes.length > 0 && nodeType !== "P") {
    obj[nodeType] = [];
    jQuery.each(childNodes, (index, childNode) => {
      if ($(node).not(".js-off-canvas-exit"))
        obj[nodeType].push(toJSON(childNode));
    });
  }
  else {
    if (nodeType === "P") {
      obj[nodeType] = $(node).html();
    }
    else {
      obj[nodeType] = $(node).text();
    }
  }

  return obj;
}

function toDOM(obj) {
  if (typeof obj == 'string') {
    obj = JSON.parse(obj);
  }
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
  return node;
}

/**
 *
 */
function reloadCSS() {
  const res = $("#result");
  res.contents().find("*").removeAttr("style");
  for (let init = 0; init < 3; init++) {
    for (let target in data['children']) {
      if ((!target.match("^.") && !target.match("^#") && init == 0)
        || (target.match("^.") && init == 1)
        || (target.match("^#") && init == 2))
        for (let cssName in data['children'][target]['attributes'])
          res.contents().find(target).css(cssName, data['children'][target]['attributes'][cssName]);
    }
  }
}

/**
 *
 */
$("#export").on("click", function () {
  ddlTemplate();
});

function ddlTemplate() {
  let a = document.createElement('a');
  let now = new Date(Date.now());
  let options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  };

  a.setAttribute('download', document.domain + '_' + now.toLocaleDateString('fr-FR', options) + '.json');
  a.href = 'data:application/json,' + exportTemplate();
  a.innerHTML = 'testing';
  a.style.display = 'none';
  document.body.appendChild(a);

  a.click();
}

/**
 *
 */
$("#import").on("click", function () {
  $("#fileInput").click();
  toDOM();
  reloadCSS();
});
