import express = require("express")
import cors = require("cors")
import db = require("./DB/db")
import dotenv = require("dotenv")
dotenv.config()

const app = express()

app.use(cors())

app.get("/", (req, res) => {
  db.default.query("use stylepalette", (err)=>{
    if(err) {
      res.send(`${err}, ${process.env.DATABASE_HOST}`)
    } else {
      res.send("DB connected - stylepalette")
    }
  })
});

app.listen(80, () => {
  console.log("open server http://localhost:80")
})