CREATE TEMP TABLE tmp_x AS
     SELECT name, gid from CTM_REGION_tb;

CREATE TEMP TABLE tmp_y AS
     SELECT domain, gid from CTM_TRACE_tb;

UPDATE CTM_REGION_tb 
     SET CTM_TRACE_tb_gid =
      ( SELECT ARRAY(
        SELECT tmp_y.gid 
          FROM tmp_y, tmp_x
          WHERE tmp_y.domain = tmp_x.name 
          AND tmp_x.gid = CTM_REGION_tb.gid 
      ));

DROP TABLE tmp_x;
DROP TABLE tmp_y;
