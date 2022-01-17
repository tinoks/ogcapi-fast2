const Database = require('better-sqlite3');


db = new Database("D:/MILDB_REF_LL84.gpkg"/*, { verbose: console.log }*/);
db.loadExtension('mod_spatialite');


const rows = db.prepare(`SELECT ROWID, Shape FROM SportsGround_S LIMIT 10`).all()


console.log(rows.map(gpkgGeomtoGeoJSON))


function gpkgGeomtoGeoJSON(row){
  const {Shape, ...prop} = row;
  const strippedGeometry = stripHeaders(row["Shape"])
  const innerQuery = " SELECT asgeojson(GeomFromWKB(X'" + strippedGeometry + "')) as result;";

  return {
    prop,
      geom: JSON.parse(db.prepare(innerQuery).get().result).coordinates[0]
  }
}


function stripHeaders(geometry) {
  const geometryHeaderHex = geometry.toString('hex');
  const envelopeSizeValues = [0, 32, 48, 48, 64];
  const flags = geometryHeaderHex.substring(6, 8);
  const binaryFlags = parseInt(flags.toString(), 16).toString(2); // see http://www.geopackage.org/spec/#flags_layout
  const maskedEnvelopeSizeBits = (binaryFlags & 1110) >>> 1;
  let envelopeSize;
  if (maskedEnvelopeSizeBits > 4) { //todo 5-7 are invalid according to the spec- just skip this? or default to 32?
      envelopeSize = envelopeSizeValues[1]
  } else {
      envelopeSize = envelopeSizeValues[maskedEnvelopeSizeBits]
  }
  const headerSizeInBytes = 2/*magic 4750*/ + 1/*version*/ + 1/*flags*/ + 4/*srs_id*/ + envelopeSize;
  return geometryHeaderHex.substring(2 * headerSizeInBytes);
}


module.exports = {
  add,
  getItems,
  getItem,
  getTile
}