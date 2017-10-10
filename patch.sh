#!/bin/bash

#echo on
set -x

git push gitlab --tags & git push bitbucket --tags & git push bb --tags & git push github --tags
npm run up
