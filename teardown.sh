#!/bin/bash

cd "$(dirname "$0")"
docker compose down
docker compose rm -sf frontend
docker volume prune -f