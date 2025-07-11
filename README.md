# Vào đúng thư mục để cấu hình
cd grafana-wepmap   
cd grafana-main

# Cấu hình
yarn install --immutable   
yarn build   
go run build.go setup   

# Cài đặt
go run build.go build   

# Chạy
Chạy file ./start-grafana.bat
