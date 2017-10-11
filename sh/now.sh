#!/bin/bash

#echo on
set -x

now --public --force
now alias us
now alias
now rm dayflow --yes --safe || true
open https://us.now.sh/build
echo "Code deployed to now server"
