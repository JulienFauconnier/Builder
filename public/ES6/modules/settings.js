export const settings = {
  get singleton() { // BEGIN iife
    let singleton;
    return function () {
      if (!singleton) {
        singleton = (function () {
          $("draggable").on("click", function () {
            console.log($(this).text());
          });
        })();
      }
      return singleton;
    };
  } // END iife
};
// Invoke: namespace.singleton().amethod()

var namespace = {
  _singleton: null,
  get singleton() {
    if (!this._singleton) {
      this._singleton = {
        amethod: function () {
          console.log("amethod");
        }
      }
    }
    return this._singleton;
  }
};
// Invoke: namespace.singleton.amethod()