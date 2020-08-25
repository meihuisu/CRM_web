<?php
function getCTMConnection() {
  $dbconn = @pg_connect("host=db port=5432 dbname=CRM_db user=webonly password=scec");

  if (!$dbconn) { // try localhost
    $dbconn = pg_connect("host=localhost port=5432 dbname=CRM_db user=webonly password=scec");
  }

  if (!$dbconn) { die('Could not connect'); }
  return $dbconn;
}

function makeCTMObj($row) {
include ("declareCTM.php");

$myObj = new \stdClass();

$myObj->gid=$row[$gid];
$myObj->domain_id=$row[$domain_id];
$myObj->name=$row[$name];
$myObj->full_name=$row[$full_name];
$myObj->color=$row[$color];

$myObj->CTM_TRACE_tb_gid=$row[$CTM_TRACE_tb_gid];

$myJSON = json_encode($myObj);

return $myJSON;
}
?>
