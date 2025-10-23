@echo off
echo ========================================
echo    Starting NeuroWrite Platform
echo ========================================
echo.

echo [1/2] Starting Backend Server (Port 8001)...
start "NeuroWrite Backend" cmd /k "cd /d E:\projects\neurowrite-platform\ai-engine && python main.py"
timeout /t 3 /nobreak > nul

echo [2/2] Starting Frontend Server (Port 3000)...
start "NeuroWrite Frontend" cmd /k "cd /d E:\projects\neurowrite-platform\neurowrite-app && npm run dev"

echo.
echo ========================================
echo    Both servers are starting!
echo ========================================
echo.
echo Backend:  http://localhost:8001
echo Frontend: http://localhost:3000
echo.
echo Press any key to open the app in browser...
pause > nul

start http://localhost:3000

echo.
echo To stop servers, close the terminal windows.
