<?php
function getConnection() {
  $dbconn = @pg_connect("host=db port=5432 dbname=CRM_db user=webonly password=scec");

  if (!$dbconn) { // try localhost
    $dbconn = pg_connect("host=localhost port=5432 dbname=CRM_db user=webonly password=scec");
  }

  if (!$dbconn) { die('Could not connect'); }
  return $dbconn;
}

function makeObj($row) {

include ("declare.php");

$myObj = new \stdClass();

$myObj->gid=$row[$gid];
$myObj->domain_id=$row[$domain_id];
$myObj->name=$row[$name];
$myObj->silver=$row[$silver];
$myObj->state=$row[$state];
$myObj->color=$row[$color];
$myObj->TRACE_tb_gid=$row[$TRACE_tb_gid];

$myJSON = json_encode($myObj);

return $myJSON;
}
?>
