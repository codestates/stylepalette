import {Model, Column, Table, BelongsTo, ForeignKey} from "sequelize-typescript";
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

  @BelongsTo(() => User)
  userlike!: User

  @BelongsTo(() => Post)
  postlike!: Post
}