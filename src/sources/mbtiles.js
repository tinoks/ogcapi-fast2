const Database = require('better-sqlite3');

const add= async (file) => {

  const db = new Database(file, { fileMustExist: true });
  const stmt = db.prepare('SELECT * FROM metadata');
  const {name, description, bounds, format, minzoom, maxzoom, json } = stmt.all().reduce((obj, cur) => ({ ...obj, [cur.name]: cur.value }), {});


  require("../configuration/configdb").addCollection({
    id: name,
    title: name,
    desc: description,
    keywords: "",
    bbox: bounds.split(",").map(e => Number(e)),
    tiles: "mbtiles",
    items: ""
  })

  require("../configuration/configdb").addSource({
    id: name,
    type: "mbtiles",
    path: file,
    extra: JSON.stringify({
      format,
      minzoom, 
      maxzoom,
      json,
    })
  })

  require("../configuration/configdb").addDefaultStyle({
    id: name,
    title: name,
    desc: description,
    keywords: "",
    bbox: bounds.split(",").map(e => Number(e)),
    tiles: "mbtiles",
    items: ""
  },
  "raster",
  json)
};

const getTile = async (file, z, x, y) => {
  y = (1 << z) - y - 1;

  const db = new Database(file, { fileMustExist: true });
  const stmt = db.prepare('SELECT tile_data FROM tiles WHERE zoom_level=? and tile_column=? and tile_row=?').get(z, x, y);

  return stmt?.tile_data || null;
};

module.exports = {
  add,
  getTile
}