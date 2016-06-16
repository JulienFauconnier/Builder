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

  console.log(JSON.stringify(toJSON(node)));
  //window.console.log(finalJSON);
}

function importTemplate() {
  alert("Test");
}


function toJSON(node) {
  node = node || this;

  console.log(node);

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
    obj.small = $(node).attr("height");
    obj.large = size.large;
  }

  let childNodes = $(node).children();

  if (childNodes.length > 0) {
    obj[nodeType] = [];
    jQuery.each(childNodes, (index, childNode) => {
      if ($(node).not(".js-off-canvas-exit"))
        obj[nodeType].push(toJSON(childNode));
    });
  }
  else {
    console.log(node);
    obj[nodeType] = $(node).val();
  }

  return obj;
}

function toDOM(obj) {
  if (typeof obj == 'string') {
    obj = JSON.parse(obj);
  }
  var node, nodeType = obj.nodeType;
  switch (nodeType) {
    case 1: //ELEMENT_NODE
      node = document.createElement(obj.tagName);
      var attributes = obj.attributes || [];
      for (var i = 0, len = attributes.length; i < len; i++) {
        var attr = attributes[i];
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
    var childNodes = obj.childNodes || [];
    for (i = 0, len = childNodes.length; i < len; i++) {
      node.appendChild(toDOM(childNodes[i]));
    }
  }
  return node;
}
