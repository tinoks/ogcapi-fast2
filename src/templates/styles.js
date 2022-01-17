const { baseurl, title, desc } = process.env;


module.exports = {
  styles: (collectionId, styles) => ({
    "links": [
      {
        "rel": "self",
        "type": "application/json",
        "title": "This document",
        "href": `${baseurl}${collectionId ? "/collections/" + collectionId : ""}/styles?f=html`
      },
      {
        "rel": "alternate",
        "type": "text/html",
        "title": "This document as HTML",
        "href": baseurl + "/styles?f=html"
      }
    ],
    "styles": styles.map(style => {
      const { id } = style;
      return {
        "title": id,
        "links": [
          {
            "rel": "stylesheet",
            "type": "application/vnd.mapbox.style+json",
            "title": "Style in format 'Mapbox'",
            "href": `${baseurl}${collectionId ? "/collections/" + collectionId : ""}/styles/${id}?f=mbs`
          },
          {
            "rel": "stylesheet",
            "type": "text/html",
            "title": "Web map using the style",
            "href": `${baseurl}${collectionId ? "/collections/" + collectionId : ""}/styles/${id}?f=html`
          },
          {
            "rel": "describedby",
            "title": "Style metadata",
            "href": `${baseurl}${collectionId ? "/collections/" + collectionId : ""}/styles/${id}/metadata`
          }
        ],
        "id": id
      };
    })
  }),

  style: (collectionId, styleId) => ({
    "title": id,
    "links": [
      {
        "rel": "stylesheet",
        "type": "application/vnd.mapbox.style+json",
        "title": "Style in format 'Mapbox'",
        "href": `${baseurl}${collectionId ? "/collections/" + collectionId : ""}/styles/${styleId}?f=mbs`
      },
      {
        "rel": "stylesheet",
        "type": "text/html",
        "title": "Web map using the style",
        "href": `${baseurl}${collectionId ? "/collections/" + collectionId : ""}/styles/${styleId}?f=html`
      },
      {
        "rel": "describedby",
        "title": "Style metadata",
        "href": `${baseurl}${collectionId ? "/collections/" + collectionId : ""}/styles/${styleId}/metadata`
      }
    ],
    "id": id
  }),


  stylemetadata: (collectionId, styleId, style) => ({
    "title": style.name,
    "description": "",
    "links": [
      {
        "rel": "preview",
        "type": "image/png",
        "title": "thumbnail of the style",
        "href": ""
      }, {
        "rel": "self",
        "type": "application/json",
        "title": "This document",
        "href": `${baseurl}${collectionId ? "/collections/" + collectionId : ""}/styles/${styleId}/metadata?f=json`
      }, {
        "rel": "alternate",
        "type": "text/html",
        "title": "This document as HTML",
        "href": `${baseurl}${collectionId ? "/collections/" + collectionId : ""}/styles/${styleId}/metadata?f=html`
      }
    ],
    "keywords": [],
    "pointOfContact": "",
    "accessConstraints": "",
    "dates": {
      "creation": "2019-01-01T10:05:00Z",
      "publication": "2019-01-01T11:05:00Z",
      "revision": "2019-02-01T11:05:00Z",
      "validTill": "2019-02-01T11:05:00Z",
      "receivedOn": "2019-02-01T11:05:00Z"
    },
    "version": "1.0.0",
    "id": style.name,
    "scope": "style",
    "stylesheets": [{
      "title": "Mapbox",
      "version": "8",
      "specification": "https://docs.mapbox.com/mapbox-gl-js/style-spec/",
      "native": true,
      "link": {
        "rel": "stylesheet",
        "type": "application/vnd.mapbox.style+json",
        "title": "Style in format 'Mapbox'",
        "href": `${baseurl}${collectionId ? "/collections/" + collectionId : ""}/styles/${styleId}?f=mbs`
      }
    }],
    "layers": style.layers.map(layer => module.exports.stylemetadataLayer(layer))
  }),

  stylemetadataLayer: (layer) => ({
      "id": layer.id,
      "type":  layer.type,
  })
}