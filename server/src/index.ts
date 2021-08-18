import express from "express";
import cors from "cors";
import {sequelize} from "./models"
import cookieparser from "cookie-parser"
import * as fs from "fs"
import https from "https"
import dotenv from "dotenv";
dotenv.config()
import router from "./router";

const app = express()

app.use(cors({
  origin: ['https://www.stylepalette.net', 'https://stylepalette.net', 'https://localhost:3000'],
  credentials: true,
  methods: ["GET", "POST", "OPTIONS", "PUT", "PATCH", "DELETE"],
}))
app.use(cookieparser())
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

// let server;
// if (
//   fs.existsSync("./../cert/key.pem") &&
//   fs.existsSync("./../cert/cert.pem")
// ) {
//   const privateKey = fs.readFileSync(
//     "/home/kyu/projects/stylepalette/cert/key.pem",
//     "utf8"
//   );
//   const certificate = fs.readFileSync(
//     "/home/kyu/projects/stylepalette/cert/cert.pem",
//     "utf8"
//   );
//   const credentials = { key: privateKey, cert: certificate };

//   server = https.createServer(credentials, app);
//   server.listen(443, async function () {
//     console.log(`${443}번 포트에서 서버가 열렸습니다.`);
//     //await sequelize.sync({force : true})
//     await sequelize.authenticate()
//     .then(async () => {
//       console.log("connection success with DB")
//     })
//     .catch((e) => {
//       console.log("Error : " + e)
//     })
//   });
// } else {
  app.listen(80, async function () {
    console.log(`${80}번 포트에서 서버가 열렸습니다.`);
    await sequelize.authenticate()
    .then(async () => {
      console.log("connection success with DB")
    })
    .catch((e) => {
      console.log("Error : " + e)
    })
  });
// }



