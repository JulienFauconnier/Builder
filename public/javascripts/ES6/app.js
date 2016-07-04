import "babel-polyfill";
import DropZone from "./modules/dropzone";
import Toolbox from "./modules/toolbox";

$(document).foundation();

/**
 * Selection of UI parts
 */
const leftPanel = $(".off-canvas .position-left");
const rightContent = $(".off-canvas-content");

/**
 * Declaration and Initialization of widgets requirement
 * @type {jQuery|HTMLElement}
 */
const toolbox = leftPanel;
const dropZone = $("<div>", {class: "drop-zone"}).appendTo(rightContent);

/**
 * Widget Loading
 */
DropZone(dropZone);
Toolbox(toolbox);
