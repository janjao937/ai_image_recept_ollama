@echo off
title AI Receipt Scanner - UNINSTALL
color 0C
echo ==========================================
echo    WARNING: FULL SYSTEM UNINSTALL
echo ==========================================
echo This will delete:
echo 1. All Docker Containers
echo 2. ALL AI MODELS (Ollama Data)
echo ------------------------------------------
set /p confirm="Are you sure you want to delete everything? (y/n): "

if /i "%confirm%" neq "y" (
    echo.
    echo Operation Cancelled.
    pause
    exit
)

echo.
echo [1/1] Deleting Containers and Volumes...
docker-compose down -v

echo.
echo ------------------------------------------
echo Status: CLEANED (Everything Deleted)
echo ------------------------------------------
pause