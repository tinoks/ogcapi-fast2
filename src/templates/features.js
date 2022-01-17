const { baseurl } = process.env;


module.exports = {

  items: (collectionId, features, limit, offset, searchParams) => {
    searchParams = Object.entries(searchParams).map(e => e[0] + "=" + unescape(e[1])+"&").join("")
    console.log(searchParams)
    limit = Number(limit) || Number(10)
    offset = Number(offset) || Number(0)

    let template = {
      "type": "FeatureCollection",
      "numberReturned": features.length,
      "timeStamp": new Date().toISOString(),
      "features": features,
      "links": [
        {
          "href": baseurl + "/collections/" + collectionId + "/items?f=json&"+searchParams+"limit="+limit+"&offset="+offset,
          "rel": "self",
          "type": "application/geo+json",
          "title": "This document"
        },
        {
          "href": baseurl + "/collections/" + collectionId + "/items?f=html&"+searchParams+"limit="+limit+"&offset="+offset,
          "rel": "alternate",
          "type": "text/html",
          "title": "This document as HTML"
        },
        {
          "href": baseurl + "/collections/" + collectionId + "/items?f=json&"+searchParams+"limit="+limit+"&offset="+(limit+offset),
          "rel": "next",
          "type": "application/geo+json",
          "title": "This document as HTML"
        }
      ]
    }
    if(offset) template.links.push({
      "href": baseurl + "/collections/" + collectionId + "/items?f=json&"+searchParams+"limit="+limit+"&offset="+ Math.max(0,(offset-+limit)),
      "rel": "prev",
      "type": "application/geo+json",
      "title": "This document"
    })
    return template;
  },

  item: (collectionId,featureId,feature) => {
    return {
      "type": "FeatureCollection",
      "timeStamp": new Date().toISOString(),
      "features": feature,
      "links": [
        {
          "href": baseurl + "/collections/" + collectionId + "/items/"+featureId+"?f=json",
          "rel": "self",
          "type": "application/geo+json",
          "title": "This document"
        },
        {
          "href": baseurl + "/collections/" + collectionId + "/items/"+featureId+"?f=html",
          "rel": "alternate",
          "type": "text/html",
          "title": "This document as HTML"
        },
        {
          "href": baseurl + "/collections/" + collectionId +"?f=json",
          "rel": "collection",
          "type": "application/json",
          "title": "The collection the feature belongs to"
        },
        {
          "href": baseurl + "/collections/" + collectionId +"?f=html",
          "rel": "collection",
          "type": "text/html",
          "title": "The collection the feature belongs to"
        }
      ]
    }
  }

};