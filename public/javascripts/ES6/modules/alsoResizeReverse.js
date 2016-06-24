/**
 * Unused plugin to deal with reverse resize.
 * Basically, this plugin display an effect with siblings elements
 */
$.ui.plugin.add("resizable", "alsoResizeReverse", {
  start() {
    const that = $(this).resizable("instance"), o = that.options;

    $(o.alsoResizeReverse).each(function () {
      const el = $(this);
      el.data("ui-resizable-alsoresizeReverse", {
        width: parseInt(el.width(), 10), height: parseInt(el.height(), 10),
        left: parseInt(el.css("left"), 10), top: parseInt(el.css("top"), 10)
      });
    });
  },
  resize(event, ui) {
    const that = $(this).resizable("instance"),
      o = that.options,
      os = that.originalSize,
      op = that.originalPosition,
      delta = {
        height: (that.size.height - os.height) || 0,
        width: (that.size.width - os.width) || 0,
        top: (that.position.top - op.top) || 0,
        left: (that.position.left - op.left) || 0
      };

    $(o.alsoResizeReverse).each(function () {
      const el = $(this),
        start = $(this).data("ui-resizable-alsoresize-reverse"),
        style = {},
        css = el.parents(ui.originalElement[0]).length ?
          ["width", "height"] :
          ["width", "height", "top", "left"];

      jQuery.each(css, (i, prop) => {
        const sum = (start[prop] || 0) - (delta[prop] || 0);
        if (sum && sum >= 0) {
          style[prop] = sum || null;
        }
      });

      el.css(style);
    });
  },
  stop() {
    $(this).removeData("resizable-alsoresize-reverse");
  }
});