//Get the client
import mysql from "mysql2/promise";

// Create the connection to databse
const getConnection = async () => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "nodejspro",
    password: "Hien@8698",
  });
  return connection;
};

export default getConnection;
