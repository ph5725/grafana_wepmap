@echo off
cd /d %~dp0
echo Starting Grafana server...
grafana-main\bin\windows-amd64\grafana-server.exe ^
  --config=grafana-main\conf\defaults.ini ^
  --homepath=grafana-main
pause