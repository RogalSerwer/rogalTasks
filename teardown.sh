#!/bin/bash

cd "$(dirname "$0")"
if [ "$1" = "prod" ]; then
    docker compose -f ./docker-compose.prod.yml down
else
    docker compose -f ./docker-compose.dev.yml down
fi
