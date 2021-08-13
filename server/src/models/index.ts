import { Sequelize } from 'sequelize-typescript'
import { User } from './user';
import { Post } from './post';
import { tb_like } from './tb_like';

export const sequelize = new Sequelize({
  database: "stylepalette_dev", 
  username: "root", 
  password: "1637", 
  host: "127.0.0.1", 
  dialect: "mysql",
  port: 3306
})

sequelize.addModels([User, Post, tb_like])