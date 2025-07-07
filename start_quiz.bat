@echo off
echo Starting Rust Concepts Quiz Server...
echo.
echo The Rust study app will be available at: http://localhost:8000
echo Press Ctrl+C to stop the server
echo.

REM Check if Python is available
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo Using Python HTTP server...
    cd /d "%~dp0"
    python -m http.server 8000
) else (
    REM Check if Node.js is available
    node --version >nul 2>&1
    if %errorlevel% == 0 (
        echo Using Node.js HTTP server...
        cd /d "%~dp0"
        npx http-server -p 8000
    ) else (
        echo.
        echo ERROR: Neither Python nor Node.js found!
        echo.
        echo Please install one of the following:
        echo 1. Python 3.x from https://python.org
        echo 2. Node.js from https://nodejs.org
        echo.
        echo Alternatively, you can open index.html directly in your browser.
        echo.
        pause
    )
)
