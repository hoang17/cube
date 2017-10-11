#!/bin/bash

#echo on
set -x

# clean
rm -rf bin
rm -rf dist

# build
npm run bu:server
npm run bu:client
npm run bu:app

# copy files to ./bin
cp yarn.lock bin
cp package.json bin
cp now.json bin
cp .env bin
cp .env.prod bin
cp sh/now.sh bin
cp sh/heroku.sh bin
cp -r views bin
cp -r dist bin
rsync -a --exclude=public/types public bin || cp -r public bin
echo -e "*.sh\n.env\n.env.prod\nnode_modules\npublic/types\nlogs\ntmp\netc\n.DS_Store" > bin/.gitignore
