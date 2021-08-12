import dotenv from "dotenv";
dotenv.config();

interface config {
  username: string | undefined
  password: string | undefined
  database: string
  host: string | undefined
  dialect: string
  [key : string] : string | undefined
}

let development : config = {
  username: "root",
  password: "1637",
  database: "stylepalette_dev",
  host: "127.0.0.1",
  dialect: "mysql"
}
let test : config = {
  username: "root",
  password: "",
  database: "database_test",
  host: "127.0.0.1",
  dialect: "mysql"
}
let production : config = {
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: "stylepalett",
  host: process.env.DATABASE_HOST,
  dialect: "mysql"
}

export default {
  development, test, production
}

