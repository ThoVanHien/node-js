# Các kiến thức mới

## Enviroment Variables trong Nodejs

- `dotenv` là 1 package để load các biến môi trường từ file `.env`. Để truy cập được file này cần import và config đường dẫn tới file đó nếu không nằm trong root folder:

  ```javascript
  import dotenv from "dotenv";
  // lấy từ cross env
  dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
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

## Relative vs Absolute Path

- `Relative Path`:
  - `./`: current directory
  - `../`: move up (parent)
  - `cd ../`: move tới thư mục cha

- `Absolute Path`:
  - Đường dẫn thật = Thư mục chứa `tsconfig` + `baseUrl` + giá trị trong `paths`
  - Vẫn phải cài tsconfig-paths, thêm scripts trong nodemon và cấu hình `tsconfig`:

    ```json
      npm i --save-dev --save-exact tsconfig-paths@4.2.0

      "exec": "ts-node -r tsconfig-paths/register ./src/app.ts"

      {
        "compilerOptions": {
          "baseUrl": "." //Là thư mục project,
          "paths": {
            "config/*": ["./src/config/*"],
            ...
          }
        }
      }
    ```

  - Tìm trong paths -> Replace thành đường dẫn relative -> combine với `baseUrl` -> final path (path dài ra tới ổ đĩa)

## Import và Export (ES6)

- Import chỉ để execute side effect, set biến (không cần export):

  ```javascript
  // config.js
  console.log("Config loaded");
  window.APP_NAME = "My App";

  // main.js
  import "./config.js";
  ```

- Default import/export:

  ```javascript
  // a.js
  export default something;

  // b.js
  import tenBatKy from "./a.js";
  ```

- Named export:

  ```javascript
  // a.js
  export const PI = 3.14;
  export {constA, fnB...}
  export {maskA as MaskB}

  // b.js
  import {PI} from "./a.js";
  import {constA} from "./a.js";
  import {maskB} from "./a.js";

  // lấy hết các export và gán lại thành 1object:
  import * as Obj from "./a.js";

  // import type thường dùng trong interface
  import type {IUser}  ".."
  ```

- `Barrel Pattern`:
  - Tạo 1 file index
  - index: export \* from "ở thư mục export khác" (nhiều)
  - import {objA1...} from "thư mục chứa index"

## Luồng MVC (SSR)

- `View` -> `Routes` -> `Controller` -> `Service` (`Model`) -> `Database` -> `Service` -> `Controller` -> `Routes` -> `View`
