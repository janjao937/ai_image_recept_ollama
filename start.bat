@echo off
title AI Receipt Scanner - START
color 0B
echo ==========================================
echo    STARTING AI RECEIPT SCANNER (2026)
echo ==========================================
echo [1/3] Building and Running Containers...
docker-compose up --build -d

echo.
echo [2/3] Checking AI Model (llama3.2-vision)...
echo (If it's the first time, this will download ~4-8GB)
echo ------------------------------------------
docker exec -it ollama ollama run llama3.2-vision

echo.
echo [3/3] System is Ready!
echo ------------------------------------------
echo Frontend : http://localhost:5173
echo Backend  : http://localhost:3001
echo ==========================================
pause