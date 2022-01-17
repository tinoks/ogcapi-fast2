const { baseurl, title, desc } = process.env;

const tilesetList = (collectionId) => ({
  "title": title || "KORTxyz",
  "description": desc || "",
  "links": [
    {
      "rel": "self",
      "type": "application/json",
      "title": "This document",
      "href": `${baseurl}${collectionId ? "/collections/" + collectionId : ""}/tiles?f=json`
    },
    {
      "rel": "alternate",
      "type": "text/html",
      "title": "This document as HTML",
      "href": `${baseurl}${collectionId ? "/collections/" + collectionId : ""}/tiles?f=html`
    }
  ],
  "tilesets": [{
    "links": [{
      "rel": "self",
      "title": "Access the data as tiles in the tile matrix set 'WebMercatorQuad'",
      "href": `${baseurl}${collectionId ? "/collections/" + collectionId : ""}/tiles/WebMercatorQuad`
    },
    {
      "rel": "item",
      "type": "image/jpeg",
      "title": "temlate for tiles",
      "href": `${baseurl}${collectionId ? "/collections/" + collectionId : ""}/tiles/WebMercatorQuad/{tileMatrix}/{tileRow}/{tileCol}`,
      "templated": true
    }],
    "dataType": "raster",
    "tileMatrixSetId": "WebMercatorQuad",
    "tileMatrixSetURI": "http://www.opengis.net/def/tilematrixset/OGC/1.0/WebMercatorQuad",
    "tileMatrixSetDefinition": "https://demo.ldproxy.net/daraa/tileMatrixSets/WebMercatorQuad",
    "tileMatrixSetLimits": [],
    "boundingBox": {},
    "centerPoint": {},
    "layers": []
  }]
});

const tilejson = (collectionId) => ({
  "tilejson": "3.0.0",
  "tiles": [
    `${baseurl}${collectionId ? "/collections/" + collectionId : ""}/tiles/WebMercatorQuad/{z}/{y}/{x}`
  ],
  "vector_layers": [],
  "bounds": [
    -180, -85, 180, 85
  ],
  "center": [
    0, 0, 7
  ],
  "description": "",
  "maxzoom": 18,
  "minzoom": 0,
  "name": collectionId
})

const tileset = () => ({
  "type": "TileMatrixSetType",
  "title": "Google Maps Compatible for the World",
  "identifier": "WebMercatorQuad",
  "boundingBox": {
    "type": "BoundingBoxType",
    "crs": "http://www.opengis.net/def/crs/EPSG/0/3857",
    "lowerCorner": [-20037508.3427892, -20037508.3427892],
    "upperCorner": [20037508.3427892, 20037508.3427892]
  },
  "supportedCRS": "http://www.opengis.net/def/crs/EPSG/0/3857",
  "wellKnownScaleSet": "http://www.opengis.net/def/wkss/OGC/1.0/GoogleMapsCompatible",
  "tileMatrix":
    [
      {
        "type": "TileMatrixType",
        "identifier": "0",
        "scaleDenominator": 559082264.028717,
        "topLeftCorner": [-20037508.3427892, 20037508.3427892],
        "tileWidth": 256,
        "tileHeight": 256,
        "matrixWidth": 1,
        "matrixHeight": 1
      },
      {
        "type": "TileMatrixType",
        "identifier": "1",
        "scaleDenominator": 279541132.014358,
        "topLeftCorner": [-20037508.3427892, 20037508.3427892],
        "tileWidth": 256,
        "tileHeight": 256,
        "matrixWidth": 2,
        "matrixHeight": 2
      },
      {
        "type": "TileMatrixType",
        "identifier": "2",
        "scaleDenominator": 139770566.007179,
        "topLeftCorner": [-20037508.3427892, 20037508.3427892],
        "tileWidth": 256,
        "tileHeight": 256,
        "matrixWidth": 4,
        "matrixHeight": 4
      },
      {
        "type": "TileMatrixType",
        "identifier": "3",
        "scaleDenominator": 69885283.0035897,
        "topLeftCorner": [-20037508.3427892, 20037508.3427892],
        "tileWidth": 256,
        "tileHeight": 256,
        "matrixWidth": 8,
        "matrixHeight": 8
      },
      {
        "type": "TileMatrixType",
        "identifier": "4",
        "scaleDenominator": 34942641.5017948,
        "topLeftCorner": [-20037508.3427892, 20037508.3427892],
        "tileWidth": 256,
        "tileHeight": 256,
        "matrixWidth": 16,
        "matrixHeight": 16
      },
      {
        "type": "TileMatrixType",
        "identifier": "5",
        "scaleDenominator": 17471320.7508974,
        "topLeftCorner": [-20037508.3427892, 20037508.3427892],
        "tileWidth": 256,
        "tileHeight": 256,
        "matrixWidth": 32,
        "matrixHeight": 32
      },
      {
        "type": "TileMatrixType",
        "identifier": "6",
        "scaleDenominator": 8735660.37544871,
        "topLeftCorner": [-20037508.3427892, 20037508.3427892],
        "tileWidth": 256,
        "tileHeight": 256,
        "matrixWidth": 64,
        "matrixHeight": 64
      },
      {
        "type": "TileMatrixType",
        "identifier": "7",
        "scaleDenominator": 4367830.18772435,
        "topLeftCorner": [-20037508.3427892, 20037508.3427892],
        "tileWidth": 256,
        "tileHeight": 256,
        "matrixWidth": 128,
        "matrixHeight": 128
      },
      {
        "type": "TileMatrixType",
        "identifier": "8",
        "scaleDenominator": 2183915.09386217,
        "topLeftCorner": [-20037508.3427892, 20037508.3427892],
        "tileWidth": 256,
        "tileHeight": 256,
        "matrixWidth": 256,
        "matrixHeight": 256
      },
      {
        "type": "TileMatrixType",
        "identifier": "9",
        "scaleDenominator": 1091957.54693108,
        "topLeftCorner": [-20037508.3427892, 20037508.3427892],
        "tileWidth": 256,
        "tileHeight": 256,
        "matrixWidth": 512,
        "matrixHeight": 512
      },
      {
        "type": "TileMatrixType",
        "identifier": "10",
        "scaleDenominator": 545978.773465544,
        "topLeftCorner": [-20037508.3427892, 20037508.3427892],
        "tileWidth": 256,
        "tileHeight": 256,
        "matrixWidth": 1024,
        "matrixHeight": 1024
      },
      {
        "type": "TileMatrixType",
        "identifier": "11",
        "scaleDenominator": 272989.386732772,
        "topLeftCorner": [-20037508.3427892, 20037508.3427892],
        "tileWidth": 256,
        "tileHeight": 256,
        "matrixWidth": 2048,
        "matrixHeight": 2048
      },
      {
        "type": "TileMatrixType",
        "identifier": "12",
        "scaleDenominator": 136494.693366386,
        "topLeftCorner": [-20037508.3427892, 20037508.3427892],
        "tileWidth": 256,
        "tileHeight": 256,
        "matrixWidth": 4096,
        "matrixHeight": 4096
      },
      {
        "type": "TileMatrixType",
        "identifier": "13",
        "scaleDenominator": 68247.346683193,
        "topLeftCorner": [-20037508.3427892, 20037508.3427892],
        "tileWidth": 256,
        "tileHeight": 256,
        "matrixWidth": 8192,
        "matrixHeight": 8192
      },
      {
        "type": "TileMatrixType",
        "identifier": "14",
        "scaleDenominator": 34123.6733415964,
        "topLeftCorner": [-20037508.3427892, 20037508.3427892],
        "tileWidth": 256,
        "tileHeight": 256,
        "matrixWidth": 16384,
        "matrixHeight": 16384
      },
      {
        "type": "TileMatrixType",
        "identifier": "15",
        "scaleDenominator": 17061.8366707982,
        "topLeftCorner": [-20037508.3427892, 20037508.3427892],
        "tileWidth": 256,
        "tileHeight": 256,
        "matrixWidth": 32768,
        "matrixHeight": 32768
      },
      {
        "type": "TileMatrixType",
        "identifier": "16",
        "scaleDenominator": 8530.91833539913,
        "topLeftCorner": [-20037508.3427892, 20037508.3427892],
        "tileWidth": 256,
        "tileHeight": 256,
        "matrixWidth": 65536,
        "matrixHeight": 65536
      },
      {
        "type": "TileMatrixType",
        "identifier": "17",
        "scaleDenominator": 4265.45916769956,
        "topLeftCorner": [-20037508.3427892, 20037508.3427892],
        "tileWidth": 256,
        "tileHeight": 256,
        "matrixWidth": 131072,
        "matrixHeight": 131072
      },
      {
        "type": "TileMatrixType",
        "identifier": "18",
        "scaleDenominator": 2132.72958384978,
        "topLeftCorner": [-20037508.3427892, 20037508.3427892],
        "tileWidth": 256,
        "tileHeight": 256,
        "matrixWidth": 262144,
        "matrixHeight": 262144
      },
      {
        "type": "TileMatrixType",
        "identifier": "19",
        "scaleDenominator": 1066.36479192489,
        "topLeftCorner": [-20037508.3427892, 20037508.3427892],
        "tileWidth": 256,
        "tileHeight": 256,
        "matrixWidth": 524288,
        "matrixHeight": 524288
      },
      {
        "type": "TileMatrixType",
        "identifier": "20",
        "scaleDenominator": 533.182395962445,
        "topLeftCorner": [-20037508.3427892, 20037508.3427892],
        "tileWidth": 256,
        "tileHeight": 256,
        "matrixWidth": 1048576,
        "matrixHeight": 1048576
      },
      {
        "type": "TileMatrixType",
        "identifier": "21",
        "scaleDenominator": 266.591197981222,
        "topLeftCorner": [-20037508.3427892, 20037508.3427892],
        "tileWidth": 256,
        "tileHeight": 256,
        "matrixWidth": 2097152,
        "matrixHeight": 2097152
      },
      {
        "type": "TileMatrixType",
        "identifier": "22",
        "scaleDenominator": 133.295598990611,
        "topLeftCorner": [-20037508.3427892, 20037508.3427892],
        "tileWidth": 256,
        "tileHeight": 256,
        "matrixWidth": 4194304,
        "matrixHeight": 4194304
      },
      {
        "type": "TileMatrixType",
        "identifier": "23",
        "scaleDenominator": 66.6477994953056,
        "topLeftCorner": [-20037508.3427892, 20037508.3427892],
        "tileWidth": 256,
        "tileHeight": 256,
        "matrixWidth": 8388608,
        "matrixHeight": 8388608
      },
      {
        "type": "TileMatrixType",
        "identifier": "24",
        "scaleDenominator": 33.3238997476528,
        "topLeftCorner": [-20037508.3427892, 20037508.3427892],
        "tileWidth": 256,
        "tileHeight": 256,
        "matrixWidth": 16777216,
        "matrixHeight": 16777216
      }
    ]
})

module.exports = {
  tilesetList,
  tilejson
}