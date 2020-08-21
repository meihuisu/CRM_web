/***
   ctm_region_util.js
***/

function makeHeatRegionsInfoTable() {
   var tb=CTM_tb['regions'];
   var cnt=tb.length;
   var i;
   var tbhtml="<table><tbody><tr><td style=\"border-top:1px solid white;border-left:1px solid white;border-right:1px solid white;\">CTM Heat Flow Region Name Table</td></tr></tbody></table>";
   tbhtml=tbhtml+"<div class=\"gfm-info-table\"><table><tbody>";
   tbhtml=tbhtml+"<tr><th style=\"width:35vw\">Name</th><th style=\"width:60vw\">Description</th></tr>";
   for( i=0; i<cnt; i++) {
     var item=tb[i];
     var name=item['name'];
     var fname=item['full_name'];
     var t="<tr><td style=\"width:35vw\">"+name+"</td><td style=\"width:60vw\">"+fname+"</td></tr>";
     tbhtml=tbhtml+t;
   } 
   tbhtml=tbhtml+"</tbody></table></div>";
   return tbhtml;
}


