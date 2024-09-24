// src/utils/parseXml.js
export const parseXML = (xmlString) => {
    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlString, "application/xml");
    const layers = [...xml.getElementsByTagName("Layer")].map((layer) => {
      const title = layer.getElementsByTagName("ows:Title")[0]?.textContent;
      const identifier = layer.getElementsByTagName("ows:Identifier")[0]?.textContent;
      const resourceURL = layer.getElementsByTagName("ResourceURL")[0]?.getAttribute("template");
  
      return {
        title,
        identifier,
        resourceURL,
      };
    });
    return layers;
  };
  