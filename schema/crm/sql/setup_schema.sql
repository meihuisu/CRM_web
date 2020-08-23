CREATE TABLE POINT_tb (
     gid serial PRIMARY KEY,
     CRM_REGION_tb_gid integer ARRAY,

     lat FLOAT, 
     lon FLOAT,
     description VARCHAR(200)
);

CREATE TABLE CTM_REGION_tb (
     gid serial PRIMARY KEY,
     CTM_TRACE_tb_gid integer ARRAY,

     domain_id INTEGER,
     name VARCHAR(100),
     full_name VARCHAR(100),
     color VARCHAR(50),
     description VARCHAR(200)
);

CREATE TABLE GFM_REGION_tb (
     gid serial PRIMARY KEY,

     domain_id INTEGER,
     name VARCHAR(100),
     sliver INTEGER,
     color VARCHAR(50),
     description VARCHAR(200)
);

CREATE TABLE CRM_REGION_tb (
     gid serial PRIMARY KEY,
     GFM_REGION_tb_gid integer,
     CRM_TRACE_tb_gid integer ARRAY,

     domain_id INTEGER,
     name VARCHAR(100),
     color VARCHAR(50),
     description VARCHAR(200)
);



