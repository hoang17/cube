#!/bin/bash

#echo on
set -x

git push bb --all
git push gitlab --all
git push github --all
git push bitbucket --all
