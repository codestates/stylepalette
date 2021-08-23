import AWS from "aws-sdk"
import multer from "multer"
import multerS3 from "multer-s3"
import path from "path"
import dotenv from "dotenv"
dotenv.config()

const bucket = "stylepalette-s3"

const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.ACCESS_KEY_PASSWORD,
  region: process.env.REGION
});

export const previewUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: bucket,
    contentType: multerS3.AUTO_CONTENT_TYPE, // 자동으로 콘텐츠 타입 세팅
    acl: 'public-read-write',
    key: (req, file, cb) => {
      let extension = path.extname(file.originalname)
      cb(null, 'preview/'+Date.now().toString()+extension);
    }
  }),
  limits: { fileSize: 5 * 1024 * 1024 } // 용량 제한
});

export const profileUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: bucket,
    contentType: multerS3.AUTO_CONTENT_TYPE, // 자동으로 콘텐츠 타입 세팅
    acl: 'public-read-write',
    key: (req, file, cb) => {
      let extension = path.extname(file.originalname)
      cb(null, 'profileimage/'+Date.now().toString()+extension);
    }
  }),
  limits: { fileSize: 5 * 1024 * 1024 } // 용량 제한
});

export const resultUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: bucket,
    contentType: multerS3.AUTO_CONTENT_TYPE, // 자동으로 콘텐츠 타입 세팅
    acl: 'public-read-write',
    key: (req, file, cb) => {
      let extension = path.extname(file.originalname)
      cb(null, 'resultimage/'+Date.now().toString()+extension);
    }
  }),
  limits: { fileSize: 5 * 1024 * 1024 } // 용량 제한
});

