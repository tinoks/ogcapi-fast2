const fastify = require('fastify');
const fs = require('fs')
const util = require('util')
const { pipeline } = require('stream')
const pump = util.promisify(pipeline)
const { uploadfolder } = process.env;

const api = require("../configuration/api")

module.exports = (opts={}) => {
  const spec = api.getSpec()
  globalThis.api = spec;

  const handler = api.getHandler()

  const app = fastify(opts)
        app.register(require('./plugins/oas3-fastify'), { spec, handler })

        const onFile = async part => await pump(part.file, fs.createWriteStream(uploadfolder + part.filename))
        app.register(require('fastify-multipart'), { attachFieldsToBody: true, onFile })

        app.register(require('fastify-cors'), {exposedHeaders: 'Content-Disposition'});

        app.register(require("point-of-view"), {
          engine: {
            eta: require("eta"),
            cache: false
          },
        });
  return app
  
}