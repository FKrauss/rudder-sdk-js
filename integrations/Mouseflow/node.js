class MouseflowNode {
  constructor() {
    console.log("nothing to construct");
  }

  init() {
    console.log("node not supported");

    console.log("===in init===");
  }

  identify(rudderElement) {
    console.log("node not supported");
  }

  track(rudderElement) {
    console.log("node not supported");
  }

  page(rudderElement) {
    console.log("node not supported");
  }

  loaded() {
    console.log("in mouseflow isLoaded");
    console.log("node not supported");
  }
}

export { MouseflowNode };
