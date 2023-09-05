const { Pool } = require("pg");

export const pool = new Pool({
  user: "stepful_admin",
  host: "localhost",
  database: "stepful_db",
  password: "password1234",
  port: 5432
});
