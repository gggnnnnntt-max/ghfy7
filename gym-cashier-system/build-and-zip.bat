@echo off
echo ============================
echo 🚀 Gym Cashier Build Script
echo ============================

REM تثبيت المكتبات
echo 📦 Running npm install...
npm install

REM بناء نسخة الموقع
echo 🛠️ Running npm run build...
npm run build

REM ضغط مجلد dist
echo 📂 Zipping dist folder...
powershell -command "Compress-Archive -Path dist\* -DestinationPath dist.zip -Force"

echo ============================
echo ✅ Done! File created: dist.zip
echo ============================

pause
