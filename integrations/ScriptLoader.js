import logger from "../utils/logUtil";
function ScriptLoader(id, src) {
  logger.debug("in script loader=== " + id);
  let js = document.createElement("script");
  js.src = src;
  js.type = "text/javascript";
  js.id = id;
  let e = document.getElementsByTagName("script")[0];
  e.parentNode.insertBefore(js, e);
}

export { ScriptLoader };
