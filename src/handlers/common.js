const fs = require('fs');
const templates = require('../templates/common');
const { baseurl } = process.env;

module.exports = {
  getLandingpage: async (req, reply, fastify) => {
    const { f } = req.query;

    if(f=="json") reply.send(templates.landingPage())
    else{
      const content = fs.createReadStream('./src/views/landingPage.html')
      reply.type('text/html').send(content)
    }

  },

  getConformance: async (req, reply, fastify) => {
    const { f } = req.query;

    if(f=="json") reply.send(templates.conformance())
    else{
      const content = fs.createReadStream('./src/views/conformance.html')
      reply.type('text/html').send(content)
    }

  },

  getAPI: async (req, reply, fastify) => {
    const { f } = req.query;
    if(f=="json") reply.send(globalThis.api)
    else{
      return reply.view("./src/views/redoc.eta",{baseurl});

    }
  },

  getCollections: async (req, reply, fastify) => {
    const { f, q, keywords, limit, offset, bbox } = req.query;

    const  data = await require('../configuration/configdb').getCollections(q, keywords, limit, offset, bbox);

    const collections = 
      data.map(collection => {
        const { id, title, desc, bounds, tiles, items } = collection;
        return templates.collection(id, title, desc, bounds, tiles, items)
      })


    if(f=="json") {
      reply.send(templates.collections(collections))
    }
    else{
      return reply.view("./src/views/collections.eta");
    }
  },

  getCollection: async (req, reply, fastify) => {
    const { f } = req.query;
    const { collectionId } = req.params;

    const { id, title, desc, bounds, tiles, items } = await require('../configuration/configdb').getCollection(collectionId);

    if(f=="json") {
      reply.send(templates.collection(id, title, desc, bounds, tiles, items))
    }
    else{
      return reply.view("./src/views/collection.eta",{id, title, desc, bounds, tiles, items});
    }

  },
}
