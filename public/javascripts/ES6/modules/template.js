export {exportTemplate, importTemplate};

function getPrevious(element) {
  let prev_el = element.previousSibling;
  while (prev_el.nodeType == 3) {
    prev_el = prev_el.previousSibling;
  }
  return prev_el;
}

function recursive(element) {
  //var classname = element.className.split(' ');
  // element.nodeName == 'UL'
  let Result = {"title": '', "json": {}};
  let json = {};
  let cur_json_key = '';
  if (element.nodeType == 3) {

  }
  else {
    //console.log( element.nodeType, element );

    var nodeName = element.nodeName.toLowerCase();
    var nodeClass = element.className.toLowerCase();

    // if this is the SPAN with class 'TITLE', then create an object with the innerHTML as KEY
    // and later the value should be another object, returned from the recursion...
    if (nodeName == 'div') {
      json[element.innerHTML] = {};
      Result.title = element.innerHTML;
      Result.json = json;
    }
    else {
      var is_title_found = 0;
      var title_found = '';
      var res = {};
      // go deeper
      for (var child = 0; child < element.childNodes.length; child++) {
        //json = $.extend( {}, recursive( element.childNodes[child] ));
        res = recursive(element.childNodes[child]);
        if (res) {
          if (res.title != '') {
            is_title_found = 1;
            title_found = res.title;
          }
          else {
            $.extend(true, json, res.json);
          }
          console.log(JSON.stringify(json));
        }
      }
      if (title_found) {
        Result.json[title_found] = json
      }
      else {
        Result.json = json;
      }
    }
    return Result;
  }
}

function exportTemplate(nodes) {
  /*
   jQuery.each(nodes, (index, node) => {
   window.console.log(node);
   });
   */

  let objectToJSON = recursive(nodes[0]);

  let finalJSON = JSON.stringify(objectToJSON, null, 2);

  window.console.log(finalJSON);
}

function importTemplate() {
  alert("Test");
}
