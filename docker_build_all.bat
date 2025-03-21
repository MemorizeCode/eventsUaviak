@echo off
echo Starting Docker containers...
docker-compose down -v
docker-compose up --build
pause