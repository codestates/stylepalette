#!/bin/bash
cd /home/ubuntu/stylepalette/server/src/build
authbind --deep pm2 -f start index.js