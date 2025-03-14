@echo off
start "Client" cmd /k "cd client && npm run dev"
start "Server" cmd /k "cd server && npm run start:dev"