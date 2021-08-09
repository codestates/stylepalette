import express = require("express")
import cors = require("cors")

const app = express()

app.use(cors())

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log("open server http://localhost:3000")
})