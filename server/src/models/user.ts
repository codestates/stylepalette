import { Table, Column, Model, HasMany, BelongsToMany } from 'sequelize-typescript'
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

  @Column
  userimage!: string

  @HasMany(() => Post)
  post!: Post[]

  @BelongsToMany(() => Post, () => tb_like)
  like!: Post[]

}
