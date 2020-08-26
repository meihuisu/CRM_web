#!/usr/bin/env sh

## convert from shp file content to sql import script 
## shp2pgsql is part of postgres sql toolkit

pwd=`pwd`

#CRM_db
shp2pgsql -I -s GCS_WGS_1984 $pwd/../CRM_polygons_domains/CRM_polygons_domains crm_trace_tb > CRM_polygon_traces.sql

# old one
#shp2pgsql -I -s GCS_WGS_1984 $pwd/../CTM_polygons_2020/ctm_polygon-point ctm_point_trace_tb > CTM_old_point_traces.sql

#CTM_db
shp2pgsql -I -s GCS_WGS_1984 $pwd/../CTM_points_2020/ctm-point ctm_point_trace_tb > CTM_point_traces.sql

