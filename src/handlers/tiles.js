const { baseurl, title, desc } = process.env;

const templates = require('../templates/tiles');

const getTilesetList = async (req, reply, fastify) => {
  const { collectionId } = req.params;
  const { f } = req.query;

  if(f=="json") {
    reply.send(templates.tilesetList(collectionId))
  }
  else{
    return reply.view("./src/views/tiles.eta",{baseurl, collectionId});
  }

}

const getTileJSON = async (req, reply, fastify) => {
  const { collectionId } = req.params;
  reply.send(templates.tilejson(collectionId))
}

const getTile = async (req, reply, fastify) => {
  const { collectionId, tileMatrix, tileRow, tileCol } = req.params;

  let {type,path} = await require('../configuration/configdb').getSource(collectionId);
  const tile = await require('../sources/' + type).getTile(path, tileMatrix, tileRow, tileCol)
  
  format = "image/jpg";

  if (tile) {
    reply.headers({
      'Content-Type': format, //'application/vnd.vector-tile',
      'Content-Encoding': format == 'application/vnd.vector-tile'?'gzip':'none',
      'OATiles-hint': null // OATiles-hint: at all more detailed zoom levels empty (no data) or OATiles-hint: full (same color all the way down)
    }).send(tile)
  }
  else {
    reply.status(404).send()
  }

}

module.exports = {
  getTilesetList,
  getTileJSON,
  getTile
}