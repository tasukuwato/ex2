// src/utils/parseXml.js
export const parseXML = (xmlString) => {
  const parser = new DOMParser();
  const xml = parser.parseFromString(xmlString, "application/xml");
  const layers = [...xml.getElementsByTagName("Layer")].map((layer) => {
    const title = layer.getElementsByTagName("ows:Title")[0]?.textContent;
    const resourceURL = layer.getElementsByTagName("ResourceURL")[0]?.getAttribute("template");
    return {
      title,
      resourceURL,
    };
  });
  return layers;
};

