@echo off
setlocal
cd /d "%~dp0"

if not exist ".apex-venv\Scripts\python.exe" (
    echo Creating Apex's local Python environment...
    py -3 -m venv .apex-venv
    if errorlevel 1 goto :failed
)

echo Installing the backend packages if needed...
".apex-venv\Scripts\python.exe" -m pip install -r requirements.txt
if errorlevel 1 goto :failed

".apex-venv\Scripts\python.exe" start_apex.py
if errorlevel 1 goto :failed
goto :end

:failed
echo.
echo Apex could not start. Read the error above before trying again.
pause

:end
endlocal
