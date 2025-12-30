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
