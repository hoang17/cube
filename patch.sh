#!/bin/bash

#echo on
set -x

git push bb --all | git push gitlab --all | git push github --all | git push bitbucket --all

git push bb --tags | git push gitlab --tags | git push github --tags | git push bitbucket --tags

npm run up
