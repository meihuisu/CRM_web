#!/usr/bin/env python

## extract region info from json file and expand into sql scripts
##

import sys, os
import json
import pdb

jsonfile="gfm_region.json"
sqlfile="load_gfm_regions.sql"

fin = open(jsonfile, 'r')
jdata = json.load(fin)
fin.close()

fout = open(sqlfile, 'w+')

tb=jdata["GFM_tb"]

rlist= tb["regions"]
for item in rlist :
   id=str(item['domain_id'])
   name=item['name']
   sliver=str(item['sliver'])
   color=item['color']

   string="INSERT INTO GFM_REGION_tb (\"domain_id\",\"name\",\"sliver\",\"color\") VALUES ("+id+",\'" +name+"\'," +sliver+",\'" +color+"\');"
   fout.write(string);
   fout.write("\n");

fout.close()
