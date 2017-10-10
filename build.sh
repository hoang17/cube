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
rsync yarn.lock bin
rsync package.json bin
rsync now.json bin
rsync .env bin
rsync .env.prod bin
rsync -a views bin
rsync -a dist bin
rsync -a --exclude=public/types public bin
echo -e ".env\n.env.prod\nnode_modules\npublic/types\nlogs\ntmp\n.DS_Store" > bin/.gitignore
