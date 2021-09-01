import { Sequelize } from 'sequelize-typescript'
import { User } from './user';
import { Post } from './post';
import { tb_like } from './tb_like';
import dotenv from 'dotenv'
dotenv.config()

export const sequelize = new Sequelize({
  database: process.env.DATABASE ? process.env.DATABASE : "stylepalette_dev", 
  username: process.env.DATABASE_USER ? process.env.DATABASE_USER : "root", 
  password: process.env.DATABASE_PASSWORD ? process.env.DATABASE_PASSWORD : "1637", 
  host: process.env.DATABASE_HOST ? process.env.DATABASE_HOST : "127.0.0.1", 
  dialect: "mysql",
  port: process.env.DATABASE_PORT ? Number(process.env.DATABASE_PORT) : 3306
})

sequelize.addModels([User, Post, tb_like])