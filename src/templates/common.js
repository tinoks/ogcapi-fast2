const { baseurl, title, desc } = process.env;

module.exports = {
  landingPage: () => {
    return {
      title: title || "OGC API",
      description: desc || "",
      links: [
        {
          rel: "self",
          type: "application/json",
          title: "This document",
          href: baseurl + "?f=json",
        },
        {
          rel: "alternate",
          type: "text/html",
          title: "This document",
          href: baseurl + "?f=html",
        },
        {
          rel: "conformance",
          type: "application/json",
          title: "OGC API conformance classes implemented by this server",
          href: baseurl + "/conformance?f=json",
        },
        {
          rel: "service-desc",
          type: "application/vnd.oai.openapi+json;version=3.0",
          title: "OpenAPI 3.0 Definition of the API in json",
          href: baseurl + "/api?f=json",
        },
        {
          rel: "service-doc",
          type: "text/html",
          title: "Documentation of the API",
          href: baseurl + "/api?f=html",
        },
        {
          href: baseurl + "/collections?f=json",
          rel: "data",
          type: "application/json",
          title: "Information about the feature collections",
        },
        {
          rel: "data",
          type: "text/html",
          title: "Information about the feature collections",
          href: baseurl + "/collections?f=html",
        },
      ],
    };
  },

  conformance: () => {
    return {
      conformsTo: [
        "http://www.opengis.net/spec/ogcapi-features-1/1.0/conf/core",
      ],
    };
  },

  collections: (collections) => {
    return {
      links: [
        {
          href: baseurl + "/collections?f=json",
          rel: "self",
          type: "application/json",
          title: "this document",
        },
        {
          href: baseurl + "/collections?f=html",
          rel: "alternate",
          type: "text/html",
          title: "this document as HTML",
        },
      ],
      collections: collections,
    };
  },

  collection: (id, title, desc, bounds, tiles, items) => {

    let template = {
      id: id,
      title: title,
      description: desc,
      extent: {
        spatial: {
          bbox: [JSON.parse(bounds)], //[7.01, 50.63, 7.22, 50.78]
        },
      },
      links: [
        {
          href: baseurl + "/collections/" + id + "?f=json",
          rel: "self",
          type: "application/json",
          title: "this document",
        },{
          href: baseurl + "/collections/" + id + "?f=html",
          rel: "alternate",
          type: "text/html",
          title: "this document as HTML",
        },{
          href: baseurl + "/collections/" + id + "/styles",
          rel: "http://www.opengis.net/def/rel/ogc/1.0/styles",
          type: "application/json",
          title: "Styles to render the data in maps",
        }
      ],
    };

    if (items) template.links.push({
      href: baseurl + "/collections/" + id + "/items",
      rel: "items",
      type: "application/geo+json",
      title: "Items in the collection",
    });

    if (tiles) template.links = template.links.concat([{
      href: baseurl + "/collections/" + id + "/tiles",
      rel: "tiles",
      type: "application/json",
      title: "tiles in the collection",
    }, {
      href: baseurl + "/collections/" + id + "/tiles/WebMercatorQuad/{tileMatrix}/{tileRow}/{tileCol}",
      rel: "item",
      type: "application/vnd.mapbox-vector-tile",
      title: "Mapbox vector tiles; the link is a URI template where {tileMatrix}/{tileRow}/{tileCol} is the tile in the tiling scheme 'WebMercatorQuad'",
      templated: true
      }]);

    return template;
  },
};
