import Component from "./component";
import Structure from "./structure";
import Group from "./group";

// TODO: Improve this mess

const shortLoremIpsum = "Wingardium Leviosa",
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
  },
  {
    id: "btn", name: "Button", tag: "button", attributes: {
    class: "success button",
    "text": "Click me"
  }
  }
];

let Tool = {
  /**
   *
   * @returns {{}}
   */
  initComponents() {
    let components = {};

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
    let structures = {};

    structures.textArea = new Structure("Text Area", new Component("Label", "label", {"text": "Text Area: "}),
      [new Component("Text Area", "textarea", {"placeholder": "none"})]
    );

    structures.inputText = new Structure("Input Text", new Component("Label", "label", {"text": "Text: "}),
      [new Component("Input", "input", {"type": "text"})]
    );

    structures.inputDate = new Structure("Input Date", new Component("Label", "label", {"text": "Date: "}),
      [new Component("Input", "input", {"type": "date"})]
    );

    structures.inputDateTime = new Structure("Input DateTime", new Component("Label", "label", {"text": "Datetime: "}),
      [new Component("Input", "input", {"type": "datetime"})]
    );

    structures.inputDTL = new Structure("Input DateTime-Local", new Component("Label", "label", {"text": "Datetime-Local: "}),
      [new Component("Input", "input", {"type": "datetime-local"})]
    );

    structures.inputEmail = new Structure("Input Email", new Component("Label", "label", {"text": "Email: "}),
      [new Component("Input", "input", {"type": "email"})]
    );

    structures.inputMonth = new Structure("Input Month", new Component("Label", "label", {"text": "Month: "}),
      [new Component("Input", "input", {"type": "month"})]
    );

    structures.inputNumber = new Structure("Input Number", new Component("Label", "label", {"text": "Number: "}),
      [new Component("Input", "input", {"type": "number"})]
    );

    structures.inputPassword = new Structure("Input Password", new Component("Label", "label", {"text": "Password: "}),
      [new Component("Input", "input", {"type": "password"})]
    );

    structures.inputSearch = new Structure("Input Search", new Component("Label", "label", {"text": "Search: "}),
      [new Component("Input", "input", {"type": "search"})]
    );

    structures.inputTel = new Structure("Input Tel", new Component("Label", "label", {"text": "Tel: "}),
      [new Component("Input", "input", {"type": "tel"})]
    );

    structures.inputTime = new Structure("Input Time", new Component("Label", "label", {"text": "Time: "}),
      [new Component("Input", "input", {"type": "time"})]
    );

    structures.inputURL = new Structure("Input URL", new Component("Label", "label", {"text": "URL: "}),
      [new Component("Input", "input", {"type": "url"})]
    );

    structures.inputWeek = new Structure("Input Week", new Component("Label", "label", {"text": "Week: "}),
      [new Component("Input", "input", {"type": "week"})]
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
   * @param structures
   * @returns {{}}
   */
  initGroups(components, structures) {
    let groups = {};

    groups.login = new Group("Login",
      [{layout: {"medium": 4, "large": 4}, content: structures.inputEmail},
        {layout: {"medium": 4, "large": 4}, content: structures.inputPassword},
        {layout: {"medium": 4, "large": 4}, content: components.btn}]
    );

    groups.contact = new Group("Contact",
      [{layout: {"medium": 6, "large": 6}, content: structures.inputEmail},
        {layout: {"medium": 6, "large": 6}, content: structures.inputTel},
        {layout: {"medium": 12, "large": 12}, content: structures.textArea},
        {layout: {"medium": 12, "large": 12}, content: components.btn}]
    );

    const details = new Group("Details",
      [{layout: {"medium": 12, "large": 12}, content: structures.inputText},
        {layout: {"medium": 12, "large": 12}, content: structures.inputText}]
    );

    groups.profile = new Group("Profile",
      [{layout: {"medium": 3, "large": 3}, content: components.img},
        {layout: {"medium": 9, "large": 9}, content: details},
        {layout: {"medium": 12, "large": 12}, content: components.btn}]
    );

    groups.address = new Group("Address",
      [{layout: {"medium": 12, "large": 12}, content: structures.inputText},
        {layout: {"medium": 12, "large": 12}, content: structures.inputText},
        {layout: {"medium": 12, "large": 12}, content: structures.inputText},
        {layout: {"medium": 12, "large": 12}, content: structures.inputText},
        {layout: {"medium": 12, "large": 12}, content: structures.inputText},
        {layout: {"medium": 12, "large": 12}, content: structures.inputText},
        {layout: {"medium": 12, "large": 12}, content: structures.inputText},
        {layout: {"medium": 12, "large": 12}, content: components.btn}]
    );

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