const SPL = require('spl.js');
const fs = require("fs");

let checkFileExists = s => new Promise(r=>fs.access(s, fs.constants.F_OK, e => r(!e)))
const createConfig = async (file) => {
  const sql = await fs.promises.readFile("configDB.sql", 'utf8')
  console.log("Creating config database: "+ file)

  const db = SPL({
        autoGeoJSON: {
            precision: 0,
            options: 0
        }
    }).db()
  db.read(sql)

  const buffer = Buffer.from(db.save());

  fs.createWriteStream(file).write(buffer);

  console.log("Saved config database: " + file)
  module.exports.init()
};

module.exports = {

  init: async () => {
    const file = process.env.CONFIGDATABASE || "config.sqlite"

    const fileExists = await checkFileExists(file)
    if(!fileExists) createConfig(file)
    else{
      const b = await fs.promises.readFile(file)
      // Slice (copy) its segment of the underlying ArrayBuffer
      let databaseAsArraybufffer = b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength);
      
      globalThis.configdb = SPL().db(databaseAsArraybufffer)

      console.log("Loaded config database: "+file)
      module.exports.addCollections()
    }
  },


  getCollections: async () =>{
    let collections = await globalThis.configdb.exec('select * from collections');
    console.log(collections)

    return collections.map(e=>templates.collection(e))

  },

  addCollections: async () =>{
    const data = {title: "'TEXT'",
                  desc: "'TEXT'",
                  thumbnail: "'TEXT'",
                  keywords: "'TEXT'",
                  tiles: "'TEXT'",
                  items: "'TEXT'"
              }
  const sql = 'insert into collections values('+Object.values(data).join()+')';
  console.log(sql)
    let collections = await globalThis.configdb.exec('insert into collections values('+Object.values(data).join()+')');
    console.log(collections)

    return true
  },

  modifyCollections: async () =>{

  },

  deleteCollections: async () =>{

  },

}