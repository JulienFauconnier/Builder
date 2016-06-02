import Component from "./component";
import * as Composite from "./composite";

export default class Tool {
  /**
   *
   * @returns {{}}
   */
  static initComponents() {
    const components = {},
      shortLoremIpsum = "Lorem ipsum dolor sit amet",
      loremIpsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
      test = loremIpsum;

    components.header1 = new Component("Header 1", "h1", {"contenteditable": "true", "text": shortLoremIpsum});
    components.header2 = new Component("Header 2", "h2", {"contenteditable": "true", "text": shortLoremIpsum});
    components.header3 = new Component("Header 3", "h3", {"contenteditable": "true", "text": shortLoremIpsum});
    components.header4 = new Component("Header 4", "h4", {"contenteditable": "true", "text": shortLoremIpsum});
    components.p = new Component("Paragraphe", "p", {"contenteditable": "true", "text": shortLoremIpsum});
    components.richText = new Component("Texte enrichi", "div", {
      class: "tiny-mce",
      "data-text": "Double-cliquez pour éditer",
      "text": test
    });

    components.image = new Component("Image", "img", {
      "src": "https://placeholdit.imgix.net/~text?txtsize=42&txt=Your+Picture+Here&w=250&h=150"
    });

    return components;
  }

  /**
   *
   * @param components
   * @returns {{}}
   */
  static initStructures(components) {
    const structures = {};
    structures.input = new Composite.Structure("Test", new Component("Label", "label", {"text": "Text: "}),
      [new Component("Input", "input", {"type": "txt"})]
    );

    const mediaObject = (new Component("MediaObject", "div", {class: "media-object stack-for-small"}));

    const mediaObjectSection = (new Component("MOS1", "div", {class: "media-object-section"}));

    const thumb = (new Composite.Structure("Thumb", $("<div>", {class: "thumbnail"}),
      [components.image]
    ));

    const mos1 = (new Composite.Structure("MOS2", mediaObjectSection,
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

    const test = (new Composite.Structure("Test", new Component("Span", "span", {}), [title]));

    const link = (new Component("Lien", "a", {
      "contenteditable": "true",
      "href": "#",
      "text": "Super lien, clique vite"
    }));

    const mos2 = (new Composite.Structure("MOS2", mediaObjectSection,
      [test, new Component("Span", "br", {}), text, new Component("Span", "br", {}), link]
    ));

    structures.figure = new Composite.Structure("Figures", mediaObject,
      [mos1, mos2]
    );

    return structures;
  }

  /**
   *
   * @param components
   * @returns {{}}
   */
  static initGroups(components) {
    const groups = {};
    const Test = (new Composite.Group("Test", {"medium": 6, "large": 6},
      [components.image, components.image]));
    groups.test1 = Test;
    groups.test2 = new Composite.Group("TestNested", {"medium": 6, "large": 6}, [Test, Test]);

    return groups;
  }
}