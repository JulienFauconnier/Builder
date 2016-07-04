import * as layout from "./layout";
import * as droppable from "./droppable";
import * as settings from "./settings";
import Bootstrap3 from "./base/bootstrap3";
import Foundation6 from "./base/foundation6";

/**
 * Initialize DropZone widget (allow to interact with content)
 * @param div
 * @returns {*|jQuery}
 */
export default function init(div) {
  $.widget('plb.dropzone', {
    options: {
      debug: false,
      base: "bootstrap3"
    },
    draggables: null,
    editing: false,
    dragging: false,
    base: null,
    customParameters: settings.getParameters(),
    customOptions: settings.getOptions(),

    _create() {
      if (this.options.debug) {
        this.element.addClass("debug");
      }
      this.element.addClass("editable");
      this.updateDraggables();
    },

    _destroy() {
      this.element.removeClass("editable");
    },

    /**
     *
     */
    updateDraggables() {
      const that = this;
      that.draggables = that.element.find(".draggable");
      that.initDraggables(that.draggables);
      that.createHandles(that.draggables);

      const selector = $(".selector");
      selector.empty();
      const first = $("<option>", {value: "aaa", text: "aaa"});
      first.appendTo(selector);
      for (const draggable of that.draggables) {
        const option = $("<option>", {value: "ttt", text: "lol"});
        option.data("target", draggable);
        option.appendTo(selector);
      }

      selector.on("change", function () {
        const optionSelected = $("option:selected", this);
        if (optionSelected.data("target") !== undefined) {
          that.initCustomizable($(optionSelected.data("target")));
        }
        else {
          $(".selected-settings").empty();
        }
      })
    },

    /**
     *
     */
    initDroppables() {
      if (this.element.children(".draggables-container, .droppables-container").length < 1) {
        droppable.firstDroppable(this.element);
      } else {
        droppable.createDroppables(this.element);
      }

      const that = this, droppables = $(".droppable");

      droppables.droppable({
        hoverClass: "drop-hover",
        tolerance: "pointer",
        drop(event, ui) {
          const parent = ui.draggable.parent();
          const content = ui.draggable.data("data");

          if (parent.is("ul")) {
            ui.draggable = $("<div>", {class: "columns draggable"}).append(content.clone());
          }

          if ($(this).is('[class*="new-row"]')) {
            layout.newRow($(this), ui);
          } else if ($(this).is('[class*="new-column"]')) {
            layout.newColumn($(this), ui);
          } else if ($(this).is('[class*="new-inside"]')) {
            layout.newInside($(this), ui);
          } else if ($(this).is('[class*="new-nested"]')) {
            layout.newNested($(this), ui);
          }

          that.updateDraggables();

          //that.initSelectables();
        }
      });
    },

    /**
     * Initialize movable columns with Draggables interactions
     * @param draggables
     * @returns {*|jQuery}
     */
    initDraggables(draggables) {
      const that = this;

      draggables.draggable({
        helper() {
          const width = 100;
          const height = width * (parseInt($(this).css("height")) / parseInt($(this).css("width")));

          return $("<div>", {class: "draggable-clone"}).css({height: `${height}px`, width: `${width}px`});
        },
        handle: ".draggable-move",
        cursorAt: {left: 0, top: 0},
        start() {
          that.dragging = true;
          if ($(this).resizable("instance")) {
            $(this).resizable("destroy");
          }
          $(this).addClass('drag-active');
          that.initDroppables();
        },
        stop() {
          that.element.find(".droppables-container").remove();
          that.element.find(".droppables-container-nested").remove();
          $(this).removeClass('drag-active');
          that.dragging = false;
        }
      });
    },

    /**
     *
     * @param elem
     */
    initCustomizable(elem) {
      $(".selected-settings").empty();

      const that = this;
      const elements = elem.children()
        .not(".ui-resizable-handle, .draggable-move, .draggable-style, .draggable-edit, .draggable-del");

      jQuery.each(elements, (index, element) => {
        const selectTagName = that.customParameters[element.tagName];
        if (selectTagName !== undefined) {
          const list = $("<ul>", {text: element.tagName});

          for (let i = 0; i < selectTagName.length; i++) {
            const tagOption = selectTagName[i];
            const param = $("<li>");
            const label = $("<label>", {text: tagOption});
            let input;
            let options;

            if (that.customOptions.hasOwnProperty(tagOption)) {
              input = $("<select>");
              options = settings.initOptions(tagOption, $(element).css(tagOption));
              input.append(options);
            } else {
              input = $("<input>", {
                value: $(element).css(tagOption),
                placeholder: $(element).css(tagOption)
              });
            }

            input.appendTo(label);
            label.appendTo(param);
            param.data("parameter", tagOption);
            param.appendTo(list);
          }

          //let option = getOptions();
          //option.appendTo(list);
          list.data("function", $(this).css);
          list.data("target", element);
          list.appendTo($(".selected-settings"));
        }
      });

      $('.selected-settings input, .selected-settings select, .selected-settings textarea').on("change input", function () {
        const fun = $(this).parent().parent().parent().data("function");
        const target = $(this).parent().parent().parent().data("target");
        const parameter = $(this).parent().parent().data("parameter");
        const paramValue = $(this).val();
        $(this).data("cssValue", paramValue);
        fun.apply($(target), [parameter, paramValue]);
      });
    },
    /**
     * Initialize movable columns with Selectables interactions
     */
    initSelectables() {
      const that = this;
      div.selectable({
        cancel: ".draggable-del .draggable-move, .draggable-edit, .ui-resizable-handle",
        filter: $('.draggables-container').children('.draggable'),
        selected(event, ui) {
          $(".selected-settings").empty();

          // TODO: Other possibility -> Add elements to list, then generate options
          const elements = ui.selected.children;

          that.initCustomizable(elements);
        },
        unselected(event, ui) {
          //$(".selected-settings").empty();

          $(".selected-settings").children().filter(function () {
            return jQuery.inArray($(this).data("target"), ui.unselected.children) !== -1;
          }).remove();
        }
      });
    },

    /**
     * Display handles on resizable columns
     * @param draggables
     */
    createHandles(draggables) {
      const that = this;

      draggables.hover(function () {
        const hovered = $(this);
        if (!that.editing && !that.dragging) {
          const dragHandle = $("<div>", {class: "draggable-move icon-arrows"});
          const styleHandle = $("<div>", {class: "draggable-style icon-paint-brush"});
          const editHandle = $("<div>", {class: "draggable-edit icon-pencil"});
          const delHandle = $("<div>", {class: "draggable-del icon-trash"});

          hovered.append(dragHandle);
          hovered.append(styleHandle);
          hovered.append(editHandle);
          hovered.append(delHandle);

          $(".draggable-style").on("click", function () {
            const style = $(this).parent();

            that.initCustomizable(style);
          });

          $(".draggable-edit").on("click", function () {
            const edit = $(this).parent().children(":first");

            if (edit.hasClass("tiny-mce") && !that.editing) {
              that.editing = true;
              edit.tinymce({
                script_url: './lib/tinymce/tinymce.jquery.min.js',
                inline: true,
                setup(editor) {
                  editor.on('focus', () => {
                    //div.selectable("destroy");
                    that.editing = true;
                  });

                  editor.on('blur', () => {
                    that.editing = false;
                    tinymce.remove();
                    //that.initSelectables();
                  });
                }
              });

              setTimeout(() => {
                edit.focus();
              }, 10)
            }
          });

          $(".draggable-del").on("click", function () {

            const parentRow = $(this).parent().parent();
            const update = parentRow.children().length > 1;

            $(".selector").children().filter(function () {
              return jQuery.inArray($(this).data("target"), hovered.children) !== -1;
            }).remove();

            $(".selected-settings").children().filter(function () {
              return jQuery.inArray($(this).data("target"), hovered.children) !== -1;
            }).remove();

            $(this).parent().remove();

            if (update) {
              layout.updateRow(parentRow);
            }
            else {
              layout.removeDiv(parentRow).remove();
            }

            that.updateDraggables();
          });

          if (hovered.is(':last-child')) {
            that.createHorizontalResizable($(this));
            $(this).next().addClass("resizable-reverse");
          }
        }
      }, function () {
        $(".draggable-move").remove();
        $(".draggable-style").remove();
        $(".draggable-edit").remove();
        $(".draggable-del").remove();
        $(this).next().removeClass("resizable-reverse");
      });
    },

    /**
     *
     * @param column
     */
    createHorizontalResizable(column) {
      const that = this;
      let next,
        oldSize,
        newSize,
        oldNextSize,
        newNextSize;

      if (!that.dragging) {
        column.resizable({
          handles: 'e',
          distance: 10,
          //alsoResizeReverse: 'resizable-reverse',
          helper: "resizable-helper",
          ghost: true,
          create() {
            const instance = $(this).resizable("instance"), o = instance.options;
            o.grid = [(parseInt($(this).parent().css("width")) / 12), 0];
          },
          start() {
            that.dragging = true;

            next = $(this).next();
            oldSize = layout.getColumnSize($(this)).medium;
            oldSize = parseInt(oldSize.slice(7, oldSize.length));
            oldNextSize = layout.getColumnSize(next).medium;
            oldNextSize = parseInt(oldNextSize.slice(7, oldNextSize.length));

            const instance = $(this).resizable("instance"), o = instance.options;

            o.minWidth = o.grid[0];
            o.maxWidth = (oldSize + oldNextSize - 1) * o.minWidth;
          },
          stop() {
            const instance = $(this).resizable("instance"), o = instance.options;
            next = $(this).next();

            newSize = parseInt(instance.helper.width() / parseFloat(o.grid[0]));
            newNextSize = oldNextSize + (oldSize - newSize);

            layout.setColumnSize($(this), {"medium": newSize, "large": newSize});
            layout.setColumnSize(next, {"medium": newNextSize, "large": newNextSize});

            $(this).css("width", "");
            $(this).css("height", "");

            next.css("width", "");
            next.css("height", "");

            that.dragging = false;
          }
        });
      }
    },

    /**
     *
     */
    newPLB() {
      if (this.options.base === "bootstrap3") {
        this.base = new Bootstrap3("row", "");
      }
      else {
        this.base = new Foundation6("row", "column");
      }
    }
  });

  if (div.is(":data('plb-dropzone')")) {
    div.dropzone("destroy");
  }

  div.dropzone({debug: false});
  div.dropzone("newPLB");
}
