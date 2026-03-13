#!/bin/bash

while getopts k:h:s: flag
do
    case "${flag}" in
        k) key=${OPTARG};;
        h) hostname=${OPTARG};;
        s) service=${OPTARG};;
    esac
done

if [[ -z "$key" || -z "$hostname" || -z "$service" ]]; then
    printf "\nMissing required parameter.\n"
    printf "  syntax: deployService.sh -k <pem key file> -h <hostname> -s <service>\n\n"
    exit 1
fi

printf "\n----> Deploying React bundle $service to $hostname with $key\n"

# build
printf "\n----> Build the distribution package\n"
npm install
npm run build

# clear
printf "\n----> Clearing out previous distribution on the target\n"
ssh -i "$key" ubuntu@$hostname << ENDSSH
rm -rf services/${service}/public
mkdir -p services/${service}/public
rm -rf services/${service}/index.js
rm -rf services/${service}/package.json
rm -rf services/${service}/package-lock.json
rm -rf services/${service}/node_modules
ENDSSH


printf "\n----> Copy the distribution package to the target\n"
scp -r -i "$key" service/* ubuntu@$hostname:services/${service}
scp -r -i "$key" dist/* ubuntu@$hostname:services/${service}/public


printf "\n----> Deploy the service on the target\n"
ssh -i "$key" ubuntu@$hostname << ENDSSH
cd services/${service}
npm install
pm2 restart ${service}
ENDSSH


printf "\n----> Removing local copy of the distribution package\n"
rm -rf dist