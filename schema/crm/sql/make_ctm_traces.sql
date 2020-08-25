
SET CLIENT_ENCODING TO UTF8;
SET STANDARD_CONFORMING_STRINGS TO ON;

drop table ctm_trace_tb;

CREATE TABLE ctm_trace_tb (
   gid    serial PRIMARY KEY,
   domain varchar(254)
);
SELECT AddGeometryColumn('','ctm_trace_tb','geom','4326','MULTIPOLYGON',2);

INSERT INTO ctm_trace_tb (gid, geom) 
    SELECT CAST(gps.id AS INTEGER),
         ST_SetSRID(ST_Multi(ST_MakePolygon(ST_MakeLine(gps.geom))),'4326')
    FROM ctm_point_trace_tb AS gps
    GROUP BY gps.id; 

UPDATE ctm_trace_tb 
   SET domain =  ctm_region_tb.name
   FROM ctm_region_tb
   WHERE ctm_trace_tb.gid = ctm_region_tb.domain_id;

CREATE INDEX ON "ctm_trace_tb" USING GIST ("geom");
