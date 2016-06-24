import * as layout from "./layout";
import * as droppable from "./droppable";
import * as settings from "./settings";
import Bootstrap3 from "./base/bootstrap3";
import Foundation6 from "./base/foundation6";

/**
 * Initialize Content widget (allow to interact with objects)
 * @param div
 * @returns {*|jQuery}
 */
export default function init(div) {
  $.widget('plb.content', {
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
      this.updateDraggables();
    },

    /**
     *
     */
    updateDraggables() {
      this.draggables = this.element.find(".draggable");
      this.initDraggables(this.draggables);
      this.createHandles(this.draggables);
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
            //that.initDraggables(ui.draggable);
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

          that.initSelectables();
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
     * Initialize movable columns with Selectables interactions
     */
    initSelectables() {
      const that = this;
      div.selectable({
        cancel: ".draggable-del .draggable-move, .draggable-edit, .ui-resizable-handle",
        filter: $('.draggables-container').children('.draggable'),
        selected(event, ui) {
          $(".nSetting").empty();

          // TODO: Other possibility -> Add elements to list, then generate options
          let elements = ui.selected.children;

          jQuery.each(elements, (index, element) => {
            let selectTagName = that.customParameters[element.tagName];
            if (selectTagName !== undefined) {
              let list = $("<ul>", {text: element.tagName});

              for (let i = 0; i < selectTagName.length; i++) {
                let tagOption = selectTagName[i];
                let param = $("<li>");
                let label = $("<label>", {text: tagOption});
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
              list.appendTo($(".nSetting"));
            }
          });

          $('#panel2 input, select, textarea').on("change input", function () {
            let fun = $(this).parent().parent().parent().data("function");
            let target = $(this).parent().parent().parent().data("target");
            let parameter = $(this).parent().parent().data("parameter");
            let paramValue = $(this).val();
            $(this).data("cssValue", paramValue);
            fun.apply($(target), [parameter, paramValue]);
          });
        },
        unselected(event, ui) {
          //$(".nSetting").empty();

          $(".nSetting").children().filter(function () {
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
        let hovered = $(this);
        if (!that.editing && !that.dragging) {
          const dragHandle = $("<div>", {class: "draggable-move icon-arrows"});
          const delHandle = $("<div>", {class: "draggable-del icon-trash"});
          const editHandle = $("<div>", {class: "draggable-edit icon-pencil"});

          hovered.append(dragHandle);
          hovered.append(delHandle);
          hovered.append(editHandle);

          $(".draggable-del").on("click", function () {

            const parentRow = $(this).parent().parent();
            const update = parentRow.children().length > 1;

            $(".nSetting").children().filter(function () {
              return jQuery.inArray($(this).data("target"), hovered.children) !== -1;
            }).remove();

            $(this).parent().remove();

            if (update) {
              layout.updateRow(parentRow);
            }
            else {
              layout.removeDiv(parentRow).remove();
            }
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
                    div.selectable("destroy");
                    that.editing = true;
                  });

                  editor.on('blur', () => {
                    that.editing = false;
                    tinymce.remove();
                    that.initSelectables();
                  });
                }
              });

              setTimeout(() => {
                edit.focus();
              }, 10)
            }
          });

          if (hovered.is(':last-child')) {
            that.createHorizontalResizable($(this));
            $(this).next().addClass("resizable-reverse");
          }
        }
      }, function () {
        $(".draggable-move").remove();
        $(".draggable-del").remove();
        $(".draggable-edit").remove();
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

  if (div.is(":data('plb-content')")) {
    div.content("destroy");
  }

  div.content({debug: false});
  div.content("newPLB");
}
