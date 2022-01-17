const Database = require("better-sqlite3");
const featuresTemplates = require("../templates/features");

const add = async (file) => {
  console.log("Fetching collections from: ", file)
  const db = new Database(file, { fileMustExist: true });
  const vector_layers = db.prepare("SELECT * FROM geometry_columns_statistics s LEFT JOIN geometry_columns c ON s.f_table_name=c.f_table_name").all();

  for (const collection of vector_layers) {
    const { f_table_name, f_geometry_column, row_count, extent_min_x, extent_min_y, extent_max_x, extent_max_y, geometry_type, srid } = collection;

    const columns = await db.prepare(`SELECT * FROM pragma_table_info('${f_table_name}')`).all().map(e => { return { name: e.name, type: e.type } });

    require("../configuration/configdb").addCollection({
      id: f_table_name,
      title: f_table_name,
      desc: "",
      keywords: "",
      bbox: [extent_min_x, extent_min_y, extent_max_x, extent_max_y],
      tiles: "",
      items: "spatialite"
    })
    require("../configuration/configdb").addSource({
      id: f_table_name,
      type: "spatialite",
      path: file,
      extra: JSON.stringify({
        row_count,
        geometry_type,
        srid,
        columns,
        geometryColumn: f_geometry_column,
      })
    })
  }
};


const getItems = async (collectionId, file, extra, queryParams) => {
  const { geometryColumn, columns } = JSON.parse(extra);

  let { limit, offset, bbox, f, token, ...searchParams } = queryParams;
  const where = Object.entries(searchParams).map(e => e[0] + " = '" + unescape(e[1]) + "'").join(" AND ")

  const properties = columns.filter(e => e.name.toLowerCase() != geometryColumn.toLowerCase()).map(e => e.name).join()
  const db = new Database(file, { fileMustExist: true, verbose: console.log });
        db.loadExtension("./mod_spatialite.dll");

  const features = db.prepare(`
      SELECT ${properties}, AsGeoJSON(${geometryColumn},6) geojson 
      FROM ${collectionId} 
      WHERE ${where ? " " + where : "1=1"}
      ${bbox ? `AND ROWID IN (SELECT ROWID FROM SpatialIndex WHERE f_table_name = '${collectionId}' and f_geometry_column = '${geometryColumn}'  AND search_frame = BuildMbr(${bbox.toString()}) )` : ""} 
      LIMIT ${limit || 1000} 
      OFFSET ${offset || 0}
    `)
    .all()
    .map((feature) => {
      const properties = Object.fromEntries(Object.entries(feature).splice(1, Object.entries(feature).length - 2))

      return {
        id: Object.values(feature)[0],
        type: "Feature",
        properties: properties,
        geometry: JSON.parse(feature.geojson),
      };
    });

  const geojson = featuresTemplates.items(collectionId,features,limit,offset,searchParams); 

  return geojson;
};

const getItem = async (collectionId, file, extra, featureId) => {
  const { geometryColumn, columns } = JSON.parse(extra);


  const properties = columns.filter(e => e.name.toLowerCase() != geometryColumn.toLowerCase()).map(e => e.name).join()
  const db = new Database(file, { fileMustExist: true, verbose: console.log });
        db.loadExtension("./mod_spatialite.dll");

  const features = db.prepare(`
      SELECT ${properties}, AsGeoJSON(${geometryColumn},6) geojson 
      FROM ${collectionId} 
      WHERE ROWID=${featureId}
    `)
    .all()
    .map((feature) => {
      const properties = Object.fromEntries(Object.entries(feature).splice(1, Object.entries(feature).length - 2))

      return {
        id: Object.values(feature)[0],
        type: "Feature",
        properties: properties,
        geometry: JSON.parse(feature.geojson),
      };
    });

  const geojson = featuresTemplates.item(collectionId,featureId,features);

  return geojson;
};

const getTile = () => {
  return false;
}
module.exports = {
  add,
  getItems,
  getItem,
  getTile
}