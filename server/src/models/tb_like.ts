import {Model, Column, Table, ForeignKey} from "sequelize-typescript";
import {User} from "./user";
import {Post} from "./post";

@Table
export class tb_like extends Model {

  @ForeignKey(() => User)
  @Column
  userId!: number;

  @ForeignKey(() => Post)
  @Column
  postId!: number;
}