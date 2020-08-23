<?php
require_once("php/navigation.php");
$header = getHeader("Viewer");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>CXM test viewer</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="stylesheet" href="css/vendor/leaflet.css">
    <link rel="stylesheet" href="css/vendor/bootstrap.min.css">
    <link rel="stylesheet" href="css/vendor/bootstrap-grid.min.css">
    <link rel="stylesheet" href="css/vendor/jquery-ui.css">
    <link rel="stylesheet" href="css/vendor/glyphicons.css">
    <link rel="stylesheet" href="css/cfm-ui.css?v=1">
    <link rel="stylesheet" href="css/sidebar.css?v=1">

    <script type='text/javascript' src='js/vendor/popper.min.js'></script>
<script>L_PREFER_CANVAS = true;</script>
    <script type="text/javascript" src="js/vendor/leaflet-src.js"></script>
    <script type='text/javascript' src='js/vendor/jquery.min.js'></script>
    <script type='text/javascript' src='js/vendor/jquery.csv.js'></script>
    <script type='text/javascript' src='js/vendor/bootstrap.min.js'></script>
    <script type='text/javascript' src='js/vendor/jquery-ui.js'></script>
    <script type='text/javascript' src='js/vendor/ersi-leaflet.js'></script>
    <script type='text/javascript' src='js/vendor/FileSaver.js'></script>
    <script type='text/javascript' src='js/vendor/jszip.js'></script>
    <script type='text/javascript' src='js/vendor/jquery.floatThead.min.js'></script>

    <!--
    https://leaflet.github.io/Leaflet.draw/docs/Leaflet.draw-latest.html#l-draw
    this is for including the Leaflet.draw plugin
    -->
    <link rel="stylesheet" href="plugin/Leaflet.draw/leaflet.draw.css">
    <script type='text/javascript' src="plugin/Leaflet.draw/Leaflet.draw.js"></script>
    <script type='text/javascript' src="plugin/Leaflet.draw/Leaflet.Draw.Event.js"></script>
    <script type='text/javascript' src="plugin/Leaflet.draw/Toolbar.js"></script>
    <script type='text/javascript' src="plugin/Leaflet.draw/Tooltip.js"></script>
    <script type='text/javascript' src="plugin/Leaflet.draw/ext/GeometryUtil.js"></script>
    <script type='text/javascript' src="plugin/Leaflet.draw/ext/LatLngUtil.js"></script>
    <script type='text/javascript' src="plugin/Leaflet.draw/ext/LineUtil.Intersect.js"></script>
    <script type='text/javascript' src="plugin/Leaflet.draw/ext/Polygon.Intersect.js"></script>
    <script type='text/javascript' src="plugin/Leaflet.draw/ext/Polyline.Intersect.js"></script>
    <script type='text/javascript' src="plugin/Leaflet.draw/ext/TouchEvents.js"></script>
    <script type='text/javascript' src="plugin/Leaflet.draw/draw/DrawToolbar.js"></script>
    <script type='text/javascript' src="plugin/Leaflet.draw/draw/handler/Draw.Feature.js"></script>
    <script type='text/javascript' src="plugin/Leaflet.draw/draw/handler/Draw.SimpleShape.js"></script>
    <script type='text/javascript' src="plugin/Leaflet.draw/draw/handler/Draw.Polyline.js"></script>
    <script type='text/javascript' src="plugin/Leaflet.draw/draw/handler/Draw.Marker.js"></script>
    <script type='text/javascript' src="plugin/Leaflet.draw/draw/handler/Draw.Circle.js"></script>
    <script type='text/javascript' src="plugin/Leaflet.draw/draw/handler/Draw.CircleMarker.js"></script>
    <script type='text/javascript' src="plugin/Leaflet.draw/draw/handler/Draw.Polygon.js"></script>
    <script type='text/javascript' src="plugin/Leaflet.draw/draw/handler/Draw.Rectangle.js"></script>
    <script type='text/javascript' src="plugin/Leaflet.draw/edit/EditToolbar.js"></script>
    <script type='text/javascript' src="plugin/Leaflet.draw/edit/handler/EditToolbar.Edit.js"></script>
    <script type='text/javascript' src="plugin/Leaflet.draw/edit/handler/EditToolbar.Delete.js"></script>
    <script type='text/javascript' src="plugin/Leaflet.draw/Control.Draw.js"></script>
    <script type='text/javascript' src="plugin/Leaflet.draw/edit/handler/Edit.Poly.js"></script>
    <script type='text/javascript' src="plugin/Leaflet.draw/edit/handler/Edit.SimpleShape.js"></script>
    <script type='text/javascript' src="plugin/Leaflet.draw/edit/handler/Edit.Rectangle.js"></script>
    <script type='text/javascript' src="plugin/Leaflet.draw/edit/handler/Edit.Marker.js"></script>
    <script type='text/javascript' src="plugin/Leaflet.draw/edit/handler/Edit.CircleMarker.js"></script>
    <script type='text/javascript' src="plugin/Leaflet.draw/edit/handler/Edit.Circle.js"></script>

    <!-- cfm js -->
    <script type="text/javascript" src="js/debug.js?v=1"></script>
    <script type="text/javascript" src="js/cfm_leaflet.js?v=1"></script>
    <script type="text/javascript" src="js/cfm_main.js?v=1"></script>
    <script type="text/javascript" src="js/cfm_query.js?v=1"></script>
   
    <script type="text/javascript" src="js/gfm_region.js?v=1"></script>
    <script type="text/javascript" src="js/cfm_misc_util.js?v=1"></script>
 
<!-- crm js --> 
    <script type="text/javascript" src="js/crm_util.js?v=1"></script>
    <script type="text/javascript" src="js/crm_query.js?v=1"></script>
    <script type="text/javascript" src="js/crm_layer.js?v=1"></script>
</head>
<body>
<?php echo $header; ?>


<div class="container main">
<!-- MISC -->
<div id="misc_tools">
  <div class="row">
<!--
     <button id="loadCFMGeoBtn" class="btn cfm-small-btn"  onClick="loadCFMRegions()" disabled>
                <span class="glyphicon glyphicon-arrow-down"></span> Load CFM geoJson</button>
-->
     <button id="loadCRMGeoBtn" class="btn cfm-small-btn"  onClick="loadCRMRegions()">
                <span class="glyphicon glyphicon-arrow-down"></span> Load CRM geoJson</button>
     <button id="loadCTMGeoBtn" class="btn cfm-small-btn"  onClick="loadCTMRegions()">
                <span class="glyphicon glyphicon-arrow-down"></span> Load CTM geoJson</button>


     <input class="form-control" id='fileGeoJsonBtn' type='file' onchange='readAndProcessActiveGeo(this.files)'  style='display:none;'>
     <button class="btn cfm-small-btn" title="open a geoJson file to ingest" onclick='javascript:document.getElementById("fileGeoJsonBtn").click();'>
            <span class="glyphicon glyphicon-file"></span> Select geoJson file to load</button>

     <input class="form-control" id='fileLatlonBtn' type='file' onchange='readAndProcessActiveLatlon(this.files)'  style='display:none;'>
     <button class="btn cfm-small-btn" title="open a Latlon file to ingest" onclick='javascript:document.getElementById("fileLatlonBtn").click();'>
            <span class="glyphicon glyphicon-file"></span> Select Latlon csv file to load</button>
  </div>
  <div class="row">
<!--
     <button id="dumpCFMGeoBtn" class="btn cfm-small-btn"  onClick="dumpActiveCFMGeo()" disabled>
                <span class="glyphicon glyphicon-share-alt"></span> Export CFM geoJson</button>
-->
     <button id="dumpCRMGeoBtn" class="btn cfm-small-btn"  onClick="dumpActiveCRMGeo()">
                <span class="glyphicon glyphicon-share-alt"></span> Export CRM geoJson</button>
     <button id="dumpCTMGeoBtn" class="btn cfm-small-btn"  onClick="dumpActiveCTMGeo()">
                <span class="glyphicon glyphicon-share-alt"></span> Export CTM geoJson</button>
  </div>
</div> <!-- END of MISC -->

<div class="row" style="display:none;">
    <div class="col justify-content-end custom-control-inline">
        <div style="display:none;" id="external_leaflet_control"></div>
        <button id="refreshBtn" class="btn cfm-top-small-btn" title="refresh to initial state"
          onclick="refreshAll();">
          <span class="glyphicon glyphicon-refresh"></span></button>
    </div>
</div>

<div class="d-flex justify-content-end mb-2">
    <div class="input-group input-group-sm" id="map-controls">
      <div class="input-group-prepend">
                    <label class="input-group-text" for="mapLayer">Select Map Type</label>
      </div>
      <select id="mapLayer" class="custom-select custom-select-sm" style="width:auto;" onchange="switchLayer(this.value);">
          <option selected value="esri topo">ESRI Topographic</option>
          <option value="esri NG">ESRI National Geographic</option>
          <option value="esri imagery">ESRI Imagery</option>
          <option value="otm topo">OTM Topographic</option>
          <option value="osm street">OSM Street</option>
      </select>
    </div>
</div>
<div class="row mapData">
    <div class="col-3 button-container d-flex flex-column">
      <div id="searchResult" style="overflow:hidden;" class="mb-1"> </div>
      <div id="geoSearchByObjGidResult" style="display:none"></div>
      <div id="phpResponseTxt"></div>
    </div>

    <div class="col-9 pr-0 pl-2 ">
         <div class="row w-100 mb-1" id='CFM_plot'
             style="position:relative;border:solid 1px #ced4da; height:576px;"></div>

    </div>
</div>

<div id='queryBlock' style="overflow:hidden;;border:1px solid green;">
</div> <!-- query block -->

</body>
</html>
