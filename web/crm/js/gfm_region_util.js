/****

  gfm_region.js

****/
function showInTable(key) {
   var tb=GFM_tb['description'];
   var cnt=tb.length;
   for( i=0; i<cnt; i++) {
     var item=tb[i];
     var label=item['id'];
     if(label == key) {
       return item['show'];
     }
  }
  window.console.log("ERROR, showInTable, no such key",key);
  return 0;
}

function showLabelInTable(key) {
   var tb=GFM_tb['description'];
   var cnt=tb.length;
   for( i=0; i<cnt; i++) {
     var item=tb[i];
     var label=item['id'];
     if(label == key) {
       if(item['show'])
         return item['label'];
       return 0;
     }
  }
  window.console.log("ERROR, showLabelInTable, no such key",key);
  return 0;
}

// create a table with all gfm regions  GFM_tb['regions']
function makeRegionResultTable()
{
    var regions=GFM_tb['regions'];
   
    var htable=document.getElementById("gfmTableHeader");
    var h="<tr><td style=\"width:36px;\"><button id=\"allBtn\" class=\"btn btn-sm gfm-small-btn\" title=\"select all available regions\" onclick=\"toggleAll();\"><span id=\"toggle_all\" class=\"glyphicon glyphicon-ok-sign\"></span></button></td><td style=\"border-right:0\"><b>GFM Geological Regions</b></td><td style=\"width:40px;background:#F2F2F2;border-left:0;padding:3px 13px 3px 2px;\"><button class=\"btn btn-dark\" title=\"plot selected regions in 3D viewer\" onclick=\"executePlot3d()\">plot3D</button></td></tr>";
    var row=htable.insertRow();
    row.innerHTML=h;

    var table=document.getElementById("gfmTable");
    var bodyhtml="<tbody>"; 
    var cnt=0;
    var sz=regions.length;
    for( var i=0; i< sz; i++) {
       var s=regions[i];
       var name=s['name'];
       var gid=s['domain_id'];
       var ts=s['ts_files'];
       var sliver=s['sliver'];
       if(sliver == 0 ) {
         var t;
       /* if there is a ts file, then make it selectable */
         if(ts == undefined) {
            window.console.log("did not set ts.length for ", name);
         }
         if(ts.length > 0) {
           // special case, there is no layer associate with the region
           if(getFromList(gfm_id2id_list,gid)) {
               t= "<tr id=\"row_"+gid+"\"><td style=\"width:25px\"><button class=\"btn btn-sm gfm-small-btn\" id=\"button_id2id_"+gid+"\" title=\"mark the region\" onclick=toggle_id2id_highlight("+gid+")><span id=\"highlight_id2id_"+gid+"\" class=\"glyphicon glyphicon-unchecked\"></span></button><td><label for=\"button_id2id_"+gid+"\">" + name + "</label></td></tr>";
               } else {
                   t= "<tr id=\"row_"+gid+"\"><td style=\"width:25px\"><button class=\"btn btn-sm gfm-small-btn\" id=\"button_id2id_"+gid+"\" title=\"mark the special region\" onclick=toggle_id2id_special_highlight("+gid+")><span id=\"highlight_id2id_special_"+gid+"\" class=\"glyphicon glyphicon-unchecked\" style=\"color:grey\"></span></button><td><label for=\"button_id2id_special"+gid+"\">" + name + "</label></td></tr>";
                   add_id2id_special_list(gid,name);
           }
         } else  {
t= "<tr id=\"row_"+gid+"\"><td style=\"width:25px\"><button class=\"btn btn-sm gfm-small-fix-btn\" id=\"button_id2id_"+gid+"\" title=\"unselectable region\"><span id=\"highlight_id2id_"+gid+"\" class=\"glyphicon glyphicon-remove-sign\"></span></button><td><label for=\"button_id2id_"+gid+"\">" + name + "</label></td></tr>";
         }

         bodyhtml=bodyhtml+t;
         cnt++;
       }
    }
    bodyhtml=bodyhtml+"</body>";
    table.innerHTML=bodyhtml;

    if (visibleRegions.getBounds().isValid()) {
        viewermap.fitBounds(visibleRegions.getBounds());
    }
    window.console.log("GFM regions from table  ==>",cnt);
}

function makeTSList(activelist) {
    var rlist=GFM_tb['regions'];
    var rcnt=rlist.length;
    var tslist=[];
    var cnt=activelist.length;
    for(var i=0; i<rcnt; i++) {
      var item=rlist[i]; 
      var gid=item['domain_id'];
      if(activelist.includes(gid)) {
         var ts=item['ts_files'];
         var nlist=tslist.concat(ts);
         tslist=nlist;
      }
    }
    return tslist;
}

function makeFileFormatInfoTable() {
   var tb=GFM_tb['fileformats'];
   var cnt=tb.length;
   var i;
   var tbhtml="<table><tbody><tr><td style=\"border-top:1px solid white;border-left:1px solid white;border-right:1px solid white;\">File Format Table</td></tr></tbody></table>";
   tbhtml=tbhtml+"<div class=\"gfm-info-table\"><table><tbody>";
   tbhtml=tbhtml+"<tr><th style=\"width:18vw\">Format</th><th style=\"width:4vw\">suffix</th><th style=\"width:40vw\">Description</th></tr>";

   for( i=0; i<cnt; i++) {
     var item=tb[i];
     var fname=item['format name'];
     var suffix=item['suffix'];
     var description=item['description'];
     var t="<tr><td style=\"width:18vw\">"+fname+"</td><td style=\"width:4vw\">"+suffix+"</td><td style=\"width:40vw\">"+description+"</td></tr>";
     tbhtml=tbhtml+t;
   }
   tbhtml=tbhtml+"</tbody></table></div>";
   return tbhtml;
}

//var MPtb_label_order=['X','Y','Z','elevation','vp','vs','rho','region','rock','heatRegion','CTM_smoothed'];
function makeParametersInfoTable() {
   var tb=GFM_tb['description'];
   var colcnt=MPtb_label_order.length;
   var cnt=tb.length;
   var i;
   var tmp;
   var tbhtml="<table><tbody><tr><td style=\"border-top:1px solid white;border-left:1px solid white;border-right:1px solid white;\">CVMH+GFM v1.0 Parameters Table</td></tr></tbody></table>";
   tbhtml=tbhtml+"<div class=\"gfm-info-table\"><table><tbody>";
   tbhtml=tbhtml+"<tr><th style=\"width:10vw\">Parameter</th><th style=\"width:45vw\">Description</th></tr>";
   for( i=0; i<colcnt; i++) {
     var key=MPtb_label_order[i];
     for(var j=0; j<cnt; j++) {
        item=tb[j];
        if(item['id'] == key)
          break;
     }
     var label=item['label'];
     var description=item['description'];
     if( item['show'] ) {
       var t="<tr><td style=\"width:10vw\">"+label+"</td><td style=\"width:45vw\">"+description+"</td></tr>";
       tbhtml=tbhtml+t;
     }
   }
   tbhtml=tbhtml+"</tbody></table></div>";
   return tbhtml;
}


function makeRegionsInfoTable() {
   var tb=GFM_tb['regions'];
   var cnt=tb.length;
   var i;
   var tbhtml="<table><tbody><tr><td style=\"border-top:1px solid white;border-left:1px solid white;border-right:1px solid white;\">GFM v1.0 Region Name Table</td></tr></tbody></table>";
   tbhtml=tbhtml+"<div class=\"gfm-info-table\"><table><tbody>";
   tbhtml=tbhtml+"<tr><th style=\"width:5vw\">ID</th><th style=\"width:30vw\">Region Name</th><th style=\"width:8vw\">sliver</th></tr>";
   for( i=0; i<cnt; i++) {
     var item=tb[i];
     var id=item['domain_id']
     var name=item['name'];
     var sliver=item['sliver'];
     var t="<tr><td style=\"width:5vw\">"+id+"</td><td style=\"width:30vw\">"+name+"</td><td style=\"width:8vw\">"+sliver+"</td></tr>";
     tbhtml=tbhtml+t;
   }
   tbhtml=tbhtml+"</tbody></table></div>";
   return tbhtml;
}

function getZModeNameWithType(z)
{
   var tb=GFM_tb['zmodes'];
   var cnt=tb.length;
   for( i=0; i<cnt; i++) {
     var item=tb[i];
     if(item['value'] == z) 
       return item['mode name']; 
   }
   return "UNKNOWN";
}

function makeZModeInfoTable() {
   var tb=GFM_tb['zmodes'];
   var cnt=tb.length;
   var i;
   var tbhtml="<table><tbody><tr><td style=\"border-top:1px solid white;border-left:1px solid white;border-right:1px solid white;\">Z Mode Table</td></tr></tbody></table>";
   tbhtml=tbhtml+"<div class=\"gfm-info-table\"><table><tbody>";
   tbhtml=tbhtml+"<tr><th style=\"width:8vw\">Mode</th><th style=\"width:40vw\">Description</th></tr>";

   for( i=0; i<cnt; i++) {
     var item=tb[i];
     var mname=item['mode name'];
     var description=item['description'];
     var t="<tr><td style=\"width:6vw\">"+mname+"</td><td style=\"width:40vw\">"+description+"</td></tr>";
     tbhtml=tbhtml+t;
   }
   tbhtml=tbhtml+"</tbody></table></div>";
   return tbhtml;
}


function getRegionNameWithID(id) {
   var tb=GFM_tb['regions'];
   var cnt=tb.length;
   var i;
   for(i=0; i<cnt;i++) {
      var region=tb[i];
      if(region['domain_id'] == id) {
        var n= region['name'];
        if(region['sliver'])
            n=n+"*";
        return n;
      }
   }
   return undefined;
}

function getRegionNameWithID2(id) {
   var tb=GFM_tb['regions'];
   var cnt=tb.length;
   var i;
   for(i=0; i<cnt;i++) {
      var region=tb[i];
      if(region['domain_id'] == id) {
        var n= region['name'];
        return n;
      }
   }
   return undefined;
}

function getRegionColorWithID(id) {
   var tb=GFM_tb['regions'];
   var cnt=tb.length;
   var i;
   for(i=0; i<cnt;i++) {
      var region=tb[i];
      if(region['domain_id'] == id) 
        return region['color'];
   }
   return undefined;
}

function getRegionIDWithName(n) {
   var tb=GFM_tb['regions'];
   var cnt=tb.length;
   var i;
   for(i=0; i<cnt;i++) {
      var region=tb[i];
      var nn=region['name'];
      if( nn.replace(/\s+/g, '') == n.replace(/\s+/g, ''))
        return region['domain_id'];
   }
   return undefined;
}

function getRegionColorWithName(name) {
   var tb=GFM_tb['regions'];
   var cnt=tb.length;
   var i;
   for(i=0; i<cnt;i++) {
      var region=tb[i];
      if(region['name'] == name) 
        return region['color'];
   }
   return undefined;
}

function getRegionStateWithID(id) {
   var tb=GFM_tb['regions'];
   var cnt=tb.length;
   var i;
   for(i=0; i<cnt;i++) {
      var region=tb[i];
      if(region['domain_id'] == id) 
        return region['state'];
   }
   return undefined;
}

function setRegionStateWithID(id,state) {
   var tb=GFM_tb['regions'];
   var cnt=tb.length;
   var i;
   for(i=0; i<cnt;i++) {
      var region=tb[i];
      if(region['domain_id'] == id) 
        region['state']=state;
   }
}


function getDescriptWithLabel(label) {
   var tb=GFM_tb['description'];
   var cnt=tb.length;
   var i;
   for(i=0; i< cnt; i++) {
       var u=tb[i];
       if(u['id']==label) {
          var n=u['description'];
          if(n == 'NA') 
            return undefined;
          return n;
       }
   }
   window.console.log("ERROR: can not find label %s",label);
   return undefined;
}

function getDescriptWithLabelAndVal(label,val) {
   var tb=GFM_tb['description'];
   var cnt=tb.length;
   var i;
   // special case for regionID
   if(label == 'regionID') {
      var n=getRegionNameWithID2(val);
      return n;
   }
   for(i=0; i< cnt; i++) {
       var u=tb[i];
       if(u['id']==label) {
          var n=u['description'];
          if(n == 'NA') 
            return undefined;
          return n;
       }
   }
   window.console.log("ERROR: can not find label %s",label);
   return undefined;
}
