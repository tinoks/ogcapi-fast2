const configfile = process.env.CONFIGDATABASE || "config.sqlite"
require('./configdb').init(configfile)

console.log(process.argv.slice(2))

/*
const url = "http://geodata.fvm.dk/geoserver/Jordbrugsanalyser/ows?"
require('./sources/wfs').add(url)
*/