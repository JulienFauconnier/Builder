import "babel-polyfill";
import Content from "./modules/content";
import Toolbox from "./modules/toolbox";

$(document).foundation();

/**
 * Declaration and Initialization of widgets requirement
 * @type {jQuery|HTMLElement}
 */
const editableArea = $("#editable-area");
const tools = $("#toolbox");

/**
 * Widget Loading
 */
Content(editableArea);
Toolbox(tools);
