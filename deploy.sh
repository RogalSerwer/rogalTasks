#!/bin/bash

file="$HOME/.config/rogaltasks/main/.env"
if [ -r $file ]; then
    docker compose rm -sfv frontend
    docker compose --env-file $file up -d --build
else
    echo "The environment file doesn't exist - please run the installation script."
    exit 1
fi