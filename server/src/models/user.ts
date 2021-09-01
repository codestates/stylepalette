import { Table, Column, Model, HasMany, BelongsToMany, Default } from 'sequelize-typescript'
import { Post } from './post'
import { tb_like } from './tb_like'

@Table
export class User extends Model {
  @Column
  username!: string

  @Column
  realname!: string

  @Column
  password!: string

  @Column
  salt!: string

  @Column
  email!: string

  @Default("https://stylepalette-s3.s3.ap-northeast-2.amazonaws.com/profileimage/1629174885444.png")
  @Column
  userimage!: string
  

  @HasMany(() => Post)
  post!: Post[]

  @BelongsToMany(() => Post, () => tb_like)
  postlike!: Post[]

  @HasMany(() => tb_like)
  like!: tb_like[]

}
