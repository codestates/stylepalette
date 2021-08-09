#!/bin/bash
cd /home/ubuntu/stylepalette/server/src/build
authbind --deep pm2 start index.js