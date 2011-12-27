#!/bin/sh
rm -rf symbols
rm *.html
cd ../../../main/javascript
jsdoc -a -d=../../site/resources/jsdoc/ -r .
