import dotenv = require("dotenv")
dotenv.config()

import mysql = require("mysql")

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "1637",
  port: 3306
})

connection.connect((err: any) => {
  if (err) {
    connection.end()
  }
})

export default connection