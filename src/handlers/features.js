
module.exports = {
  getItems: async (req, reply, fastify) => {
    const { collectionId } = req.params;
    const { f } = req.query;

    const source = await require('../configuration/configdb').getItems(collectionId)
    if(!source) reply.status(204).send();

    if(f=="json"){
      const geojson = await require('../sources/'+source.type).getItems(collectionId,source.path,source.extra,req.query)
       reply.type('application/json').send(geojson);
    }
    else{
      return reply.view("./src/views/items.eta",{collectionId});
    }
  },

  getItem: async (req, reply, fastify) => {
    const { collectionId,featureId } = req.params;
    const { f } = req.query;

    const source = await require('../configuration/configdb').getItems(collectionId)

    const geojson = await require('../sources/'+source.type).getItem(collectionId,source.path,source.extra,featureId)

    reply.type('application/json').send(geojson);
  },

}
