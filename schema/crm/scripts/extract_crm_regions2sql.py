#!/usr/bin/env python

## extract region info from json file and expand into sql scripts
##

import sys, os
import json
import pdb

jsonfile="crm_region.json"
sqlfile="load_crm_regions.sql"

fin = open(jsonfile, 'r')
jdata = json.load(fin)
fin.close()

fout = open(sqlfile, 'w+')

tb=jdata["CRM_tb"]

rlist= tb["regions"]
for item in rlist :
   id=str(item['domain_id'])
   gfm_id=str(item['gfm_id'])
   name=item['name']
   color=item['color']

   string="INSERT INTO CRM_REGION_tb (\"domain_id\",\"gfm_id\",\"name\",\"color\") VALUES ("+id+","+gfm_id+",\'" +name+"\',\'"+color+"\');"
   fout.write(string);
   fout.write("\n");

fout.close()

