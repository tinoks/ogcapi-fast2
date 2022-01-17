const add = async (url) => {
  const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
  const { XMLParser} = require("fast-xml-parser");  
  const he = require('he');

  const response = await fetch(url+"service=WFS&request=GetCapabilities")
  const XMLdata = await response.text()

  let parsedXML = new XMLParser().parse(XMLdata);

  let collections = parsedXML["wfs:WFS_Capabilities"].FeatureTypeList.FeatureType;

  collections.map(collection => {

    require("../configuration/configdb").addCollection({
      id: he.decode(e.Name), 
      title:he.decode(e.Title),
      desc: he.decode(e.Abstract),
      bbox: Object.values(e["ows:WGS84BoundingBox"]).map(e=>e.split(" ").map(e=>Number(e))).flat(),
      keywords: e['ows:Keywords']['ows:Keyword'],
      tiles: "",
      items: "WFS"
    })
    
    require("../configuration/configdb").addSource({
      id:collection.id,
      type:"WFS",
      path:"http://geodata.fvm.dk/geoserver/Jordbrugsanalyser/ows?",
      format: ""
    })

  });
  return collections;
};

const getItems = async (req, reply, fastify) => {
  const { collectionId } = req.params;
  const { f } = req.query;
  const url = "http://geodata.fvm.dk/geoserver/ows?service=WFS&version=2.0.0&count=10&request=GetFeature&outputFormat=application%2Fjson&srsName=EPSG:4326&typeName="+ collectionId;
  
  http.get(url, (stream) => reply.type('application/json').send(stream) );
};



module.exports = {
  add,
  getItems
  
  
}