<!DOCTYPE html>
<html>
<head>
</head>
<body>

<?php

include("declareCFM.php");
include("utilCFM.php");

$dbconn = getCFMConnection();

$query = "SELECT OBJECT_tb.gid,OBJECT_tb.name,alternative,source_Author,CFM_version,model_description,descriptor,strike,dip,area,exposure,slip_sense,reference,reference_check,ID_comments,USGS_ID,AREA_tb.name,ZONE_tb.name,SECTION_tb.name,FAULT_tb.name,TRACE_tb_gid FROM OBJECT_tb, AREA_tb,ZONE_tb, SECTION_tb, FAULT_tb where AREA_tb_gid = AREA_tb.gid and ZONE_tb_gid = ZONE_tb.gid and SECTION_tb_gid = SECTION_tb.gid and FAULT_tb_gid = FAULT_tb.gid";

$result = pg_query($dbconn, $query);

$metaList=array();

while($row = pg_fetch_row($result)) {
    array_push($metaList, makeCFMObj($row));
}

$metastring = htmlspecialchars(json_encode($metaList), ENT_QUOTES, 'UTF-8');

echo "<div data-side=\"allCFMTraces\" data-params=\"";
echo $metastring;
echo "\" style=\"display:flex\"></div>";

pg_close($dbconn);
?>
</body>
</html>

