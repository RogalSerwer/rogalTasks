#!/bin/bash


cd "$(dirname "$0")"
file="$HOME/.config/rogaltasks/main/.env"
if [ -r $file ]; then
    docker compose --env-file $file up -d --build --force-recreate --renew-anon-volumes
else
    echo "The environment file doesn't exist - please run the installation script."
    exit 1
fi