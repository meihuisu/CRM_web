/**
   crm_util.js

***/
// extract meta data blob from php backend, extract object_tb's gid and 
// use that to grab the matching geoJson
function processCRMTraceMeta(metaList) {
    var str="";

    if (metaList == 'metaByAllTraces') {
        str = $('[data-side="allCRMTraces"]').data('params');
    }

    if(str == undefined || str == "") {
       window.console.log("processCRMTraceMeta: BAD BAD BAD");
       return;
    }

    var sz=(Object.keys(str).length);
    window.console.log("Number of CRM meta blobs received from backend ->",sz);
    // iterate through the list and grab the geo info and update leaflet feature
    // structure one by one
    for( var i=0; i< sz; i++) {
       var meta = JSON.parse(str[i]);
       var gidstr=meta['gid'];
       var gid=parseInt(gidstr);

       // update Traces_tb_gid to be array
       var t=meta['CRM_TRACE_tb_gid']; 
       if(t == "{}")
          continue;
       var nt=t.replace('{','[');
       var nnt=nt.replace('}',']');
       var trace_tb_gid=JSON.parse(nnt);
       meta['CRM_TRACE_tb_gid']=trace_tb_gid;

       if(metaList == 'metaByAllTraces') {
         crm_region_meta_list.push({"gid":gid, "meta": meta });
         getCRMGeoJSONbyObjGid(gidstr,meta);
         } else {
            window.console.log("BAD ??");
       }
    }
    return str;
}

// extract the geo json blob from the backend php
function grabGeoJSONList() {
    var gdata = $('[data-side="geo-json"]').data('params');
    if(gdata == undefined) {
      window.console.log("ERROR -- geometry is empty");
      return "";
    }
    var glist=gdata['geoms'];
    return glist;
}

// extract meta data blob from php backend, extract object_tb's gid and 
// use that to grab the matching geoJson
function processCTMTraceMeta(metaList) {
    var str="";

    if (metaList == 'metaByAllTraces') {
        str = $('[data-side="allCTMTraces"]').data('params');
    }

    if(str == undefined || str == "") {
       window.console.log("processCTMTraceMeta: BAD BAD BAD");
       return;
    }

    var sz=(Object.keys(str).length);
    window.console.log("Number of CRM meta blobs received from backend ->",sz);
    // iterate through the list and grab the geo info and update leaflet feature
    // structure one by one
    for( var i=0; i< sz; i++) {
       var meta = JSON.parse(str[i]);
       var gidstr=meta['gid'];
       var gid=parseInt(gidstr);

       // update Traces_tb_gid to be array
       var t=meta['CTM_TRACE_tb_gid']; 
       if(t == "{}") {
          continue;
       }
       var nt=t.replace('{','[');
       var nnt=nt.replace('}',']');
       var trace_tb_gid=JSON.parse(nnt);
       meta['CTM_TRACE_tb_gid']=trace_tb_gid;

       if(metaList == 'metaByAllTraces') {
         if(gid > 14) {
            ctm_region_meta_list.unshift({"gid":gid, "meta": meta });
            } else {
               ctm_region_meta_list.push({"gid":gid, "meta": meta });
         }
         getCTMGeoJSONbyObjGid(gidstr,meta);
         } else {
            window.console.log("BAD ??");
       }
    }
    return str;
}
