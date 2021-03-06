import { ScriptLoader } from "../ScriptLoader";
import logger from "../../utils/logUtil";

class HubSpot {
  constructor(config) {
    this.hubId = config.hubID; //6405167
    this.name = "HS";
  }

  init() {
    let hubspotJs = "http://js.hs-scripts.com/" + this.hubId + ".js";
    ScriptLoader("hubspot-integration", hubspotJs);

    logger.debug("===in init HS===");
  }

  identify(rudderElement) {
    logger.debug("in HubspotAnalyticsManager identify");

    let traits = rudderElement.message.context.traits;
    let traitsValue = {};

    for (let k in traits) {
      if (!!Object.getOwnPropertyDescriptor(traits, k) && traits[k]) {
        let hubspotkey = k; //k.startsWith("rl_") ? k.substring(3, k.length) : k;
        if (toString.call(traits[k]) == "[object Date]") {
          traitsValue[hubspotkey] = traits[k].getTime();
        } else {
          traitsValue[hubspotkey] = traits[k];
        }
      }
    }
    /* if (traitsValue["address"]) {
      let address = traitsValue["address"];
      //traitsValue.delete(address)
      delete traitsValue["address"];
      for (let k in address) {
        if (!!Object.getOwnPropertyDescriptor(address, k) && address[k]) {
          let hubspotkey = k;//k.startsWith("rl_") ? k.substring(3, k.length) : k;
          hubspotkey = hubspotkey == "street" ? "address" : hubspotkey;
          traitsValue[hubspotkey] = address[k];
        }
      }
    } */
    let userProperties = rudderElement.message.context.user_properties;
    for (let k in userProperties) {
      if (
        !!Object.getOwnPropertyDescriptor(userProperties, k) &&
        userProperties[k]
      ) {
        let hubspotkey = k; //k.startsWith("rl_") ? k.substring(3, k.length) : k;
        traitsValue[hubspotkey] = userProperties[k];
      }
    }

    logger.debug(traitsValue);

    if (typeof window !== undefined) {
      let _hsq = (window._hsq = window._hsq || []);
      _hsq.push(["identify", traitsValue]);
    }
  }

  track(rudderElement) {
    logger.debug("in HubspotAnalyticsManager track");
    let _hsq = (window._hsq = window._hsq || []);
    let eventValue = {};
    eventValue["id"] = rudderElement.message.event;
    if (
      rudderElement.message.properties &&
      (rudderElement.message.properties.revenue ||
        rudderElement.message.properties.value)
    ) {
      eventValue["value"] =
        rudderElement.message.properties.revenue ||
        rudderElement.message.properties.value;
    }
    _hsq.push(["trackEvent", eventValue]);
  }

  page(rudderElement) {
    logger.debug("in HubspotAnalyticsManager page");
    let _hsq = (window._hsq = window._hsq || []);
    //logger.debug("path: " + rudderElement.message.properties.path);
    //_hsq.push(["setPath", rudderElement.message.properties.path]);
    /* _hsq.push(["identify",{
        email: "testtrackpage@email.com"
    }]); */
    if (
      rudderElement.message.properties &&
      rudderElement.message.properties.path
    ) {
      _hsq.push(["setPath", rudderElement.message.properties.path]);
    }
    _hsq.push(["trackPageView"]);
  }

  isLoaded() {
    logger.debug("in hubspot isLoaded");
    return !!(window._hsq && window._hsq.push !== Array.prototype.push);
  }

  isReady() {
    return !!(window._hsq && window._hsq.push !== Array.prototype.push);
  }
}

export { HubSpot };
