@echo off
cd /d "%~dp0"
title SpaceNinjaServer - Offline LAN
echo Starting SpaceNinjaServer with local offline NRS...
call npm run raw
echo.
echo SpaceNinjaServer stopped. Press any key to close.
pause > nul
