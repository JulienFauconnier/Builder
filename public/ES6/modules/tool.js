import Component from "./component";
import Structure from "./structure";
import Group from "./group";

// TODO: Improve this mess

const components = {},
  shortLoremIpsum = "Lorem ipsum dolor sit amet",
  loremIpsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

let parametersComponents = [
  {id: "header1", name: "Header 1", tag: "h1", attributes: {"contenteditable": "true", "text": shortLoremIpsum}},
  {id: "header2", name: "Header 2", tag: "h2", attributes: {"contenteditable": "true", "text": shortLoremIpsum}},
  {id: "header3", name: "Header 3", tag: "h3", attributes: {"contenteditable": "true", "text": shortLoremIpsum}},
  {id: "header4", name: "Header 4", tag: "h4", attributes: {"contenteditable": "true", "text": shortLoremIpsum}},
  {id: "header5", name: "Header 5", tag: "h5", attributes: {"contenteditable": "true", "text": shortLoremIpsum}},
  {id: "header6", name: "Header 6", tag: "h6", attributes: {"contenteditable": "true", "text": shortLoremIpsum}},
  {id: "p", name: "Paragraphe", tag: "p", attributes: {"contenteditable": "true", "text": shortLoremIpsum}},
  {
    id: "rt", name: "Texte Riche", tag: "div", attributes: {
    class: "tiny-mce",
    "data-text": "Double-cliquez pour éditer",
    "text": loremIpsum
  }
  },
  {
    id: "img", name: "Image", tag: "img", attributes: {
    "src": "https://placeholdit.imgix.net/~text?txtsize=42&txt=Your+Picture+Here&w=250&h=150"
  }
  }
];

let Tool = {
  /**
   *
   * @returns {{}}
   */
  initComponents() {
    for (let parameters of parametersComponents) {
      components[`${parameters.id}`] = new Component(parameters.name, parameters.tag, parameters.attributes);
    }

    return components;
  },

  /**
   *
   * @param components
   * @returns {{}}
   */
  initStructures(components) {
    const structures = {};
    structures.input = new Structure("Test", new Component("Label", "label", {"text": "Text: "}),
      [new Component("Input", "input", {"type": "txt"})]
    );

    const mediaObject = (new Component("MediaObject", "div", {class: "media-object stack-for-small"}));

    const mediaObjectSection = (new Component("MOS1", "div", {class: "media-object-section"}));

    const thumb = (new Structure("Thumb", new Component("ImgContainer", "div", {class: "thumbnail"}),
      [components.img]
    ));

    const img = (new Structure("ImgContainer", new Component("ImgContainer", "div", {class: "text-center"}),
      [components.img]
    ));

    const mos1 = (new Structure("MOS2", mediaObjectSection,
      [thumb]
    ));

    const title = (new Component("Strong", "strong", {
      "contenteditable": "true",
      "text": "Lorem ipsum dolor sit amet, consectetur ai"
    }));

    const text = (new Component("Span", "span", {
      "contenteditable": "true",
      "text": "Lorem ipsum dolor sit amet, consectetur ai"
    }));

    const test = (new Structure("Test", new Component("Span", "span", {}), [title]));

    const link = (new Component("Lien", "a", {
      "contenteditable": "true",
      "href": "#",
      "text": "Super lien, clique vite"
    }));

    const mos2 = (new Structure("MOS2", mediaObjectSection,
      [test, new Component("Span", "br", {}), text, new Component("Span", "br", {}), link]
    ));

    structures.figure = new Structure("Figure", mediaObject,
      [mos1, mos2]
    );

    structures.image = img;

    return structures;
  },

  /**
   *
   * @param components
   * @returns {{}}
   */
  initGroups(components) {
    const groups = {};
    const Test = (new Group("Test", {"medium": 6, "large": 6},
      [components.img, components.img]));
    groups.test1 = Test;
    groups.test2 = new Group("TestNested", {"medium": 6, "large": 6}, [Test, Test]);

    return groups;
  }
};

export default Tool;


let namespace = {
  get singleton() { // BEGIN iife
    let singleton;
    return function () {
      if (!singleton) {
        singleton = {
          amethod() {
            console.log("amethod");
          }
        }
      }
      return singleton;
    };
  } // END iife
};
// Invoke: namespace.singleton().amethod()