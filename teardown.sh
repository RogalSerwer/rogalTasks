#!/bin/bash

cd "$(dirname "$0")"
docker compose down
docker compose rm -sf frontend
docker volume prune -f
cd frontend
rm -rf node_modules .vite