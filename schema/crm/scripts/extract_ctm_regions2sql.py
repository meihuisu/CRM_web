#!/usr/bin/env python

## extract region info from json file and expand into sql scripts
##

import sys, os
import json
import pdb

jsonfile="ctm_region.json"
sqlfile="load_ctm_regions.sql"

fin = open(jsonfile, 'r')
jdata = json.load(fin)
fin.close()

fout = open(sqlfile, 'w+')

tb=jdata["CTM_tb"]

rlist= tb["regions"]
for item in rlist :
   id=str(item['domain_id'])
   name=item['name']
   full_name=str(item['full_name'])
   color=item['color']

   string="INSERT INTO CTM_REGION_tb (\"domain_id\",\"name\",\"full_name\",\"color\") VALUES ("+id+",\'" +name+"\',\'" +full_name+"\',\'" +color+"\');"
   fout.write(string);
   fout.write("\n");

fout.close()
