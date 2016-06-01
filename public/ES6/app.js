import "babel-polyfill";
import Content from "./modules/content";
import Toolbox from "./modules/toolbox";

$(document).foundation();
const editableArea = $("#editable-area");
const tools = $("#toolbox");

Content(editableArea);
Toolbox(tools);

// TODO: Add tags: tables, lists, forms, videos, audio, objects
