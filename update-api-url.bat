@echo off
echo Updating API_BASE URL for production...
set /p BACKEND_URL="Enter your backend URL (e.g., https://your-app.railway.app): "

powershell -Command "(Get-Content app.js) -replace 'const API_BASE = .*;', \"const API_BASE = '%BACKEND_URL%';\" | Set-Content app.js"

echo API_BASE updated to: %BACKEND_URL%
echo.
echo Now commit and push your changes:
echo git add .
echo git commit -m "Update API URL for production"
echo git push origin main
pause