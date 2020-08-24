
SET CLIENT_ENCODING TO UTF8;
SET STANDARD_CONFORMING_STRINGS TO ON;

drop table crm_trace_polygon_tb;

CREATE TABLE crm_trace_polygon_tb (
   gid    serial PRIMARY KEY,
   domain varchar(254)
);
SELECT AddGeometryColumn('','crm_trace_polygon_tb','geom','4326','MULTIPOLYGON',2);

INSERT INTO crm_trace_polygon_tb (gid, domain, geom) 
    SELECT ctm.domain_id, gps.name, ST_SetSRID(ST_Multi(ST_MakePolygon(ST_MakeLine(gps.geom))),'4326')
    FROM ctm_trace_tb AS gps,
         ctm_region_tb AS ctm
    WHERE gps.name = ctm.name AND ctm.domain_id = CAST(gps.id AS INTEGER)
    GROUP BY gps.name; 

INSERT INTO crm_trace_polygon_tb (gid, geom) 
    SELECT CAST(gps.id AS INTEGER),
         ST_SetSRID(ST_Multi(ST_MakePolygon(ST_MakeLine(gps.geom))),'4326')
    FROM ctm_trace_tb AS gps
    GROUP BY gps.id; 

UPDATE crm_trace_polygon_tb 
   SET domain =  ctm_region_tb.name
   FROM ctm_region_tb
   WHERE crm_trace_polygon_tb.gid = ctm_region_tb.domain_id;

CREATE INDEX ON "ctm_trace_polygon_tb" USING GIST ("geom");
