# BTL: BE app đặt vé xem phim

## Install Mysql Server
- Thay username, password trong file config/database.js
- Tạo Db tên cinema
## Đăng ký Cloudinary
- Truy cập https://cloudinary.com/ và đăng ký
- Vào Dashboard để lấy cloud_name, api_key và api_secret, sau đó thay vào file config/cloudinaryConfig.js
## Tạo Email gửi OTP và lấy Mật khẩu ứng dụng
- Tạo Email gửi OTP và lấy Mật khẩu ứng dụng, sau đó nhập vào hàm sendOtp trong file controllers/user.controller.js

## Install Thư Viện
```
$ npm install
```
## Run BackEnd
create file .env in folder backend

```
$ npm start
```
