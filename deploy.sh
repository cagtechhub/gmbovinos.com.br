#!/usr/bin/env bash
set -euo pipefail

docker compose up -d --remove-orphans --force-recreate --build
docker compose ps
