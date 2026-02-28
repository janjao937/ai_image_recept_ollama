@echo off
title AI Receipt Scanner - STOP
color 0E
echo ==========================================
echo    STOPPING SYSTEM (KEEPING AI DATA)
echo ==========================================
echo [1/1] Removing Containers...
docker-compose down

echo.
echo ------------------------------------------
echo Status: STOPPED (AI Models are SAFE)
echo ------------------------------------------
pause