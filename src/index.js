require('dotenv').config()

const os = require("os");
const cluster = require("cluster");
const clusterWorkerSize = os.cpus().length;

const configfile = process.env.CONFIGDATABASE || "config.sqlite"
require('./configuration/configdb').init(configfile)

const server = require('./configuration/server')({
  ignoreTrailingSlash: true,
  caseSensitive: false
})



const start = async () => {
  try {
    const address = await server.listen(process.env.PORT || "8080")

    console.info(`server listening on ${address} and worker ${process.pid}`)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

if (clusterWorkerSize > 1) {
  if (cluster.isMaster) {
      for (let i=0; i < clusterWorkerSize; i++) {
          cluster.fork();
      }

      cluster.on("exit", function(worker) {
          console.log("Worker", worker.id, " has exited.")
      })
  } else {
      start();
  }
} else {
  start();
}

