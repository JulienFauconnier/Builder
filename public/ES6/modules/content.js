import * as fn from "./functions"

export default function init(div) {
  $.widget('plb.content', {
    options: {
      debug: false
    },
    draggables: null,
    edition: false,
    dragging: false,
    _create() {
      if (this.options.debug) {
        window.console.log("debug mode enabled");
        this.element.addClass("debug");
      }
      this.draggables = this.element.find(".draggable");
    },
    /**
     *
     */
    initDroppables() {
      if (this.element.children(".draggables-container").length < 1) {
        fn.firstDroppable(this.element);
      } else {
        fn.createDroppables(this.element);
      }

      const that = this, droppables = $(".droppables-container .droppable, .droppables-container-nested .droppable");

      droppables.droppable({
        hoverClass: "drop-hover",
        tolerance: "pointer",
        drop(event, ui) {
          const parent = ui.draggable.parent();
          const content = ui.draggable.data("data");

          if (parent.is("ul")) {
            ui.draggable = $("<div>", {class: "columns draggable"}).append(content.clone());
            that.initDraggables(ui.draggable);
            ui.draggable.dblclick(function () {
              $(this).enableSelection();
              if ($(this).children(":first").hasClass("tiny-mce") && !that.edition) {
                that.edition = true;
                $(this).tinymce({
                  script_url: '../bower_components/tinymce/tinymce.jquery.min.js',
                  inline: true,
                  setup(editor) {
                    editor.on('focus', () => {
                      that.edition = true;
                    });
                    editor.on('blur', () => {
                      that.edition = false;
                      ui.draggable.disableSelection();
                      tinymce.remove();
                    });
                  }
                });
                const targetToFocus = $(this);
                setTimeout(() => {
                  targetToFocus.focus();
                }, 10)
              }
            });
          }
          if ($(this).is('[class*="new-row"]')) {
            fn.newRow($(this), ui);
          } else if ($(this).is('[class*="new-column"]')) {
            fn.newColumn($(this), ui);
          } else if ($(this).is('[class*="new-inside"]')) {
            fn.newInside($(this), ui);
          } else if ($(this).is('[class*="new-nested"]')) {
            fn.newNested($(this), ui);
          } else {
            console.warn(`Wrong drop: ${event}`);
          }
        }
      });
    },
    /**
     *
     * @param draggables
     * @returns {*|jQuery}
     */
    initDraggables(draggables) {
      const that = this;

      draggables.disableSelection();

      draggables.hover(function () {
        if (that.edition === false) {
          const dragHandle = $("<div>", {class: "draggable-move icon-arrows"});
          const delHandle = $("<div>", {class: "draggable-del icon-trash"});
          $(this).append(dragHandle);
          $(this).append(delHandle);
          $(".draggable-del").click(function () {

            const parentRow = $(this).parent().parent();
            const update = parentRow.children().length > 1;

            $(this).parent().remove();

            if (update) {
              fn.updateRow(parentRow);
            }
            else {
              parentRow.remove();
            }
          });
          if (!$(this).is(':last-child')) {
            that.createHorizontalResizable($(this));
            $(this).next().addClass("resizable-reverse");
          }
        }
      }, function () {
        $(".draggable-move").remove();
        $(".draggable-del").remove();
        $(this).next().removeClass("resizable-reverse");
      });
      draggables.draggable({
        helper() {
          const width = 100;
          const height = width * (parseInt($(this).css("height")) / parseInt($(this).css("width")));

          return $("<div>", {class: "draggable-clone"}).css({height: `${height}px`, width: `${width}px`});
        },
        handle: ".draggable-move",
        cursorAt: {left: 0, top: 0},
        start() {
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
        }
      });
    },

    /**
     *
     * @param column
     */
    createHorizontalResizable(column) {
      const thisOne = this;
      let next,
        oldSize,
        newSize,
        oldNextSize,
        newNextSize;

      if (!thisOne.dragging) {
        column.resizable({
          handles: 'e',
          distance: 10,
          //alsoResizeReverse: 'resizable-reverse',
          helper: "resizable-helper",
          ghost: true,
          create() {
            const that = $(this).resizable("instance"), o = that.options;
            o.grid = [(parseInt($(this).parent().css("width")) / 12), 0];
          },
          start() {
            thisOne.dragging = true;

            next = $(this).next();
            oldSize = fn.getColumnSize($(this)).medium;
            oldSize = parseInt(oldSize.slice(7, oldSize.length));
            oldNextSize = fn.getColumnSize(next).medium;
            oldNextSize = parseInt(oldNextSize.slice(7, oldNextSize.length));

            console.log(`${oldSize} ${oldNextSize}`);

            const that = $(this).resizable("instance"), o = that.options;

            o.minWidth = o.grid[0];
            o.maxWidth = (oldSize + oldNextSize - 1) * o.minWidth;
          },
          stop() {
            const that = $(this).resizable("instance"), o = that.options;
            next = $(this).next();

            newSize = parseInt(that.helper.width() / parseFloat(o.grid[0]));
            newNextSize = oldNextSize + (oldSize - newSize);

            fn.setColumnSize($(this), {"medium": newSize, "large": newSize});
            fn.setColumnSize(next, {"medium": newNextSize, "large": newNextSize});

            $(this).css("width", "");
            $(this).css("height", "");

            next.css("width", "");
            next.css("height", "");

            thisOne.dragging = false;
          }
        });
      }
    },
    /**
     *
     * @param row
     */
    createVerticalResizable(row) {
      const that = this;

      if (!that.dragging) {
        row.resizable({
          helper: ".resizable-helper",
          ghost: true,
          create() {
            const that = $(this).resizable("instance"), o = that.options;
            const handleSouth = $("<div>", {class: "ui-resizable-handle ui-resizable-s", style: "z-index: 90;"});
            handleSouth.appendTo($("body"));
            o.handles = {"s": $("body").children("ui-resizable-handle")};
          },
          start() {
            that.dragging = true;
          },
          stop() {
            that.dragging = false;
          }
        });
      }
    },
    newPLB() {
      this.initDraggables(this.draggables);
    }
  });

  div.content({debug: false});
  div.content("newPLB");
}
