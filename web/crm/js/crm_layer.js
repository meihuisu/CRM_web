/***
   crm_layer.js
***/

// all region gid ==> gid from region_tb
//  [ { "gid": gid1,  "meta": mmm1 }, {  "gid": gid2, "meta": mmm2 }, ... }
var crm_region_meta_list=[];

// gid is regiongid, trace is leaflet feature (1 per layer)
// [ {"gid": gid1, "trace": trace1 }, {"gid":gid2, "trace":trace2}... ], only with geo
var crm_trace_list=[];

// all region gid ==> gid from region_tb
//  [ { "gid": gid1,  "meta": mmm1 }, {  "gid": gid2, "meta": mmm2 }, ... }
var ctm_region_meta_list=[];

// gid is regiongid, trace is leaflet feature (1 per layer)
// [ {"gid": gid1, "trace": trace1 }, {"gid":gid2, "trace":trace2}... ], only with geo
var ctm_trace_list=[];


function find_crm_name_by_gid(gid) {
   var cnt=crm_region_meta_list.length;
   for(var i=0; i<cnt; i++) {
     var item=crm_region_meta_list[i];
     if(item['gid'] == gid) {
        var meta=item['meta'];
        return meta['name'];
     }
   }
   return "NA";
}

function find_ctm_name_by_gid(gid) {
   var cnt=ctm_region_meta_list.length;
   for(var i=0; i<cnt; i++) {
     var item=ctm_region_meta_list[i];
     if(item['gid'] == gid) {
        var meta=item['meta'];
        return meta['full_name'];
     }
   }
   return "NA";
}

// create a feature with a geoJSON or a geoJSONList, 
function makeGeoJSONFeature(geoJSON, gid, meta) {

  var blob=[];

  if(geoJSON == undefined) {
    window.console.log("makeGeoJSONFeature, geoJSON is null for ", gid);
    return undefined;
  }

  if(Array.isArray(geoJSON)) { // parse each term
     geoJSON.forEach(function(s) {
        blob.push(JSON.parse(s));
     });
    } else {
      blob= [ geoJSON ];
  }
  

  var color= meta['color'];

  var a_trace={"type":"FeatureCollection", "features":[]};

  var cnt=blob.length;
  for(var i=0; i<cnt; i++) {
    var style= { "weight":2,
                 "opacity":0.8,
                 "color": color
                };
    var g=blob[i];

    var tmp= { "id":gid,
               "type":"Feature", 
               "properties": {
                   "style": style
               },
               "geometry": g 
             };

    a_trace.features.push(tmp);
  }

  return a_trace;
}
