#!/bin/sh
set -e

#Changing present working directory to execute Urbancode Deploy docker-compose file.
cd Jenkins
sudo docker-compose down -v

cd ../urbancode_products
sudo docker-compose down -v
