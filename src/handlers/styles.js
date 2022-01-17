const fs = require('fs')
const templates = require('../templates/styles');

module.exports = {
  getStyles: async (req, reply, fastify) => {
    const { collectionId } = req.params;
    const { f } = req.query;

    const styles = await require('../configuration/configdb').getStyles(collectionId)

    if(f=="json") {
      reply.send(templates.styles(collectionId, styles))
    }
    else{
      return reply.view("./src/views/styles.eta",{collectionId, styles});
    }

  },

  getStyle: async (req, reply, fastify) => {
    const { collectionId, styleId } = req.params;
    const { f } = req.query;



    if(f=="mbs") {
      const { style } = await require('../configuration/configdb').getStyle(collectionId, styleId)
      reply.type('application/json').send(style);
    }
    else{
      return reply.view("./src/views/style.eta",{collectionId, styleId});
    }

  },

  getStyleMetadata: async (req, reply, fastify) => {
    const { collectionId, styleId } = req.params;
    const { f } = req.query;

    const { style } = await require('../configuration/configdb').getStyle(collectionId, styleId)
    reply.send(templates.stylemetadata(collectionId, styleId, JSON.parse(style)))

  },

  getCollectionStyles: async (req, reply, fastify) => module.exports.getStyles(req, reply, fastify),

  getCollectionStyle: async (req, reply, fastify) => module.exports.getStyle(req, reply, fastify),

  getCollectionStyleMetadata: async (req, reply, fastify) =>  module.exports.getStyleMetadata(req, reply, fastify),

}
