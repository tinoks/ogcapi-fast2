const fs = require("fs");
const commonTemplates = require("../templates/common");
//const checkFileExists = (s) => new Promise((r) => fs.access(s, fs.constants.F_OK, (e) => r(!e)));

module.exports = {
  createConfig: () => {
    const file = process.env.CONFIGDATABASE || "config.sqlite";

    const sql = fs.readFileSync("configDB.sql", { encoding: "utf-8" });
    console.log("Creating config database: " + file);
    const SPL = require("spl.js");
    const db = SPL().db();
    db.read(sql);

    const buffer = Buffer.from(db.save());
    fs.writeFileSync(file, buffer);

    console.log("Saved config database: " + file);

    configdb = require("better-sqlite3")(file);
    configdb.loadExtension("./mod_spatialite.dll");
    console.log("Loaded config database: " + file);
    return true;

  },

  init: () => {
    const file = process.env.CONFIGDATABASE || "config.sqlite";
    if (!fs.existsSync(file)) {
      module.exports.createConfig(file);
    }
    else {
      configdb = require("better-sqlite3")(file);
      configdb.loadExtension("./mod_spatialite.dll");
      console.log("Loaded config database: " + file);
      return true;
    }

  },

  getCollections: (q, keywords, limit, offset, bbox) => {
    const asBBOX = require("@turf/bbox").default;

    limit = limit || 100;
    offset = offset || 0;

    q = q
      ? `
      (title LIKE '%${q}%' OR desc LIKE '%${q}%' )
    `
      : "1=1";

    keywords = keywords
      ? `
      AND ${[]
        .concat(keywords.split(" "))
        .map((keyword) => "keywords LIKE '%" + keyword + "%'")
        .join(" AND ")}
    `
      : "";

    bbox = bbox
      ? `
      AND INTERSECTS(bbox,BuildMbr(${bbox}))
    `
      : "";

    configdb.function("asBBOX", (geom) =>
      JSON.stringify(asBBOX(JSON.parse(geom)))
    );

    const sql = `
      SELECT 
      c.ROWID, c.id,title,desc,json(keywords) as keywords, tiles, items, asBBOX(asGeojson(bbox)) as bounds
      FROM collections c
      WHERE ${q} ${bbox} ${keywords}
      ORDER BY title 
      LIMIT ? 
      OFFSET ? 
    `;
    
    return configdb.prepare(sql).all(limit, offset);

  },

  getCollection: async (collectionid) => {
    const asBBOX = require("@turf/bbox").default;

    configdb.function("asBBOX", (geom) =>
      JSON.stringify(asBBOX(JSON.parse(geom)))
    );
    const sql = `
      SELECT 
        id, title, desc, json(keywords) as keywords, tiles, items, asBBOX(asGeojson(bbox)) as bounds
      FROM collections
      WHERE id=?
    `;

    return configdb.prepare(sql).get(collectionid);
    ;
  },

  getItems: async (id) => {
    const sql = `
      SELECT type, path, extra FROM sources s
      INNER JOIN (SELECT * FROM collections WHERE id=?) c
      ON c.id=s.id and c.items=s.type;
    `;


    return configdb.prepare(sql).get(id);

  },

  addCollection: async (collection) => {
    const bboxPolygon = require("@turf/bbox-Polygon").default;

    collection.geojson = JSON.stringify(bboxPolygon(collection.bbox).geometry);
    collection.keywords = JSON.stringify(collection.keywords);

    await configdb.transaction((collection) => {
      console.log("Adding collection: ", collection.id);

      const insertStmt = configdb.prepare(
        "INSERT INTO collections VALUES ($id, $title, $desc, $keywords, $tiles, $items, SetSRID(GeomFromGeoJSON($geojson),4326))"
      );
      insertStmt.run(collection);
    })(collection);

    return true;
  },

  modifyCollection: async () => { 

  },

  deleteCollection: async () => { 

  },

  getSource: (collectionId) => {
    const sql = "SELECT id, type, path, extra FROM sources WHERE id=?";

    return configdb.prepare(sql).get(collectionId);
  },

  addSource: async (source) => {
    configdb.transaction((source) => {
      const insertStmt = configdb.prepare(
        "INSERT INTO sources VALUES ($id, $type, $path, $extra)"
      );
      insertStmt.run(source);
    })(source);

    return true;
  },


  addDefaultStyle: async (collection,datatype,json) => {

    const defaultStyle = await require('./styles').defStyle(collection,datatype,json)

    const style = {
      name: "default",
      collection: collection.id,
      style: JSON.stringify(defaultStyle)
    }

    configdb.transaction((style) => {
      const insertStmt = configdb.prepare(
        "INSERT INTO styles VALUES ($name, $collection, $style)"
      );
      insertStmt.run(style);
    })(style);

    return true;
  },

  getStyles: async (collectionId) => {
    const sql = `
      SELECT id
      FROM styles
      WHERE collection = ?
    `;

    return configdb.prepare(sql).all(collectionId);
  },

  getStyle: async (collectionId, stylesId) => {
    const sql = `
      SELECT style
      FROM styles
      WHERE  collection = ? AND ID = ?
    `;

    return configdb.prepare(sql).get(collectionId, stylesId);
  },

  getTable: async (table) => {
    const sql = "select * FROM " + table;
    return configdb.prepare(sql).all();
  },

  updateTable: async (table,id,value) => {
    const [field,newvalue] = Object.entries(value)[0];
    console.log(table,field,newvalue,id)
    const sql = `UPDATE ${table} SET ${field} = '${newvalue}' WHERE id='${id}'`
    console.log(sql)
    const stmt = configdb.prepare(sql);
    const info = stmt.run();
    console.log(info)
  }
};
