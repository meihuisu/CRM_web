<!DOCTYPE html>
<html>
<head>
</head>
<body>

<?php

include("declareCTM.php");
include("utilCTM.php");

$dbconn = getCTMConnection();

$query = "SELECT gid, domain_id, name, full_name, color, CTM_TRACE_tb_gid from CTM_REGION_tb";
$result = pg_query($dbconn, $query);

$metaList=array();

while($row = pg_fetch_row($result)) {
    array_push($metaList, makeCTMObj($row));
}

$metastring = htmlspecialchars(json_encode($metaList), ENT_QUOTES, 'UTF-8');

echo "<div data-side=\"allCTMTraces\" data-params=\"";
echo $metastring;
echo "\" style=\"display:flex\"></div>";

pg_close($dbconn);
?>
</body>
</html>

