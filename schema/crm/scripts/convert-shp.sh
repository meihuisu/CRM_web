#!/usr/bin/env sh

## convert from shp file content to sql import script 
## shp2pgsql is part of postgres sql toolkit

pwd=`pwd`

#CRM_db
shp2pgsql -I -s GCS_WGS_1984 $pwd/../CRM_polygons_domains/CRM_polygons_domains crm_trace_tb > CRM_polygon_traces.sql

