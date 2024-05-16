import mysql from "mysql2";

let pool = mysql.createPool({
  connectionLimit: 10,
  host: "petranj0.beget.tech",
  user: "petranj0_da",
  password: "Q1qqqqqq",
  database: "petranj0_da",
});

export default pool;
