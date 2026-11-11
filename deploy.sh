#!/bin/bash

cd "$(dirname "$0")"
file="$HOME/.config/rogaltasks/main/.env"
if [ -r $file ]; then
    if [ "$1" = "prod" ]; then
        docker compose --env-file $file -f ./docker-compose.prod.yml up -d --build --force-recreate
    else
        docker compose --env-file $file -f ./docker-compose.dev.yml up -d --build --force-recreate
    fi
else
    echo "The environment file doesn't exist - please run the installation script."
    exit 1
fi