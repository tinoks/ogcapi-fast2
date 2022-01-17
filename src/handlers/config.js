const configdb = require('../configuration/configdb');

getTable = async (req, reply, fastify) => {
  const { f } = req.query;
  const { table } = req.params;
  const dbResponse = await configdb.getTable(table)
  if(f=="json"){
    reply.type('application/json').send(dbResponse);
  }
  else{
    return reply.view("./src/views/sources.eta",{dbResponse});
  }
}

updateTable = async (req, reply, fastify) => {
  const { table } = req.params;
  const {id, ...value} = req.body;
  await configdb.updateTable(table,id,value)

  reply.send()
}

module.exports = {
  getTable,
  updateTable
}