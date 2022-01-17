require('dotenv').config()

const configfile = process.env.CONFIGDATABASE || "config.sqlite"
require('./configdb').init(configfile)

/*
const file = "F://data/SDFE/orto_foraar_webm_2020_z18.mbtiles";
require('../sources/mbtiles').add(file)
*/


const file = "F://data/SDFE/GeoDK.sqlite";
require('../sources/spatialite').add(file)