#!/bin/bash

cd "$(dirname "$0")"
file="$HOME/.config/rogaltasks/dev/.env"
composefile="./docker-compose.dev.yml"
name="rogaltasks-dev"
if [ "$1" = "prod" ]; then
    file="$HOME/.config/rogaltasks/main/.env"
    composefile="./docker-compose.main.yml"
    name="rogaltasks-main"
fi

if [ -r $file ]; then
    docker compose -p $name --env-file $file -f $composefile up -d --build --force-recreate
else
    echo "The environment file doesn't exist - please run the installation script."
    exit 1
fi