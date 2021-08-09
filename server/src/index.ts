import express = require("express")
import cors = require("cors")

const app = express()

app.use(cors())

app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

app.listen(80, () => {
  console.log("open server http://localhost:80")
})