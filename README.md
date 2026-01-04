# Các kiến thức mới

## Enviroment Variables trong Nodejs

- `dotenv` là 1 package để load các biến môi trường từ file `.env`. Để truy cập được file này cần import và config đường dẫn tới file đó nếu không nằm trong root folder:

  ```javascript
  import dotenv from "dotenv";
  dotenv.config({ path: "/custom/path/to/.env" });
  ```

- `cross-env` cũng là 1 package giúp set và get biến môi trường thông qua scripts trong package.json mà không cần quan tâm là môi trường hđh gì:

  ```json
    "scripts": {
        "dev": "cross-env NODE_ENV=development PORT=4000 npm run start",
        "prod": "cross-env NODE_ENV=production PORT=8080 npm run start"
    }
  ```

- Gõ lệnh set biến: `set DB_URL=... set API_KEY=... node server.js`, giống `dotenv` nhưng dài và phải tuỳ thuộc vào hđh để gõ lệnh set biến.

## Config trong Nodejs

- Config view engine:

  ```javascript
  app.set("view engine", "ejs");
  // res.render('home', { data: users }) (Trả về HTML);
  // res.json({ data: users }) (Trả về JSON cho React/Angular)
  app.set("views", __dirname + "/views");
  // Thư mục chứa views
  ```

- Config req.body:

  ```javascript
  // Client gửi lên: {"name": "Tèo", "age": 20}
  // Nhờ dòng này, server hiểu thành: req.body = { name: 'Tèo', age: 20 }
  app.use(express.json());

  // Khi bạn bấm nút Submit form, trình duyệt sẽ gom dữ liệu lại thành chuỗi dạng: name=Tèo&age=20
  // Dòng này sẽ dịch chuỗi loằng ngoằng đó thành Object req.body
  app.use(express.urlencoded({ extended: true }));
  ```

- Config static files:
  ```javascript
  // Thư mục này nằm ở client không thông qua route nào cả
  app.use(express.static("public"));
  ```

## Setup Absolute import

- `./`: current directory
- `../`: move up (parent)
- `../../../(../)`: có nghĩa là đang move tới thư mục cùng cấp với parent và trỏ vào thư mục chứa file
- Đường dẫn thật = Thư mục chứa tsconfig + `baseUrl` + giá trị trong `paths`
- Vẫn phải cài tsconfig-paths và thêm scripts trong nodemon:
  ```bash
    npm i --save-dev --save-exact tsconfig-paths@4.2.0
    "exec": "ts-node -r tsconfig-paths/register ./src/app.ts"
  ```

## Luồng MVC (SSR)

- `View` -> `Routes` -> `Controller` -> `Service` (`Model`) -> `Database` -> `Service` -> `Controller` -> `Routes` -> `View`
