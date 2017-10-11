#!/bin/bash

#echo on
set -x

git init
git add .
git commit -am 'new deployment'
git remote add heroku https://git.heroku.com/dayflow.git
git push heroku master --force
open http://yah.vn/build
echo "Code deployed to heorku server"
