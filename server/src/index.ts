import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {sequelize} from "./models"

dotenv.config()
 
import router from "./router";

const app = express()

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.use(router)

app.get("/", async (req, res) => {
  await sequelize.authenticate()
  .then(async () => {
    res.send("connection success with DB")
  })
  .catch((e) => {
    res.send("Error : " + e)
  })
});

app.listen(3000, async () => {
  console.log("open server http://localhost:3000")

  await sequelize.authenticate()
  .then(async () => {
    console.log("connection success with DB")
  })
  .catch((e) => {
    console.log("Error : " + e)
  })
 
})



