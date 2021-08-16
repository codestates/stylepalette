import { Table, Column, Model, ForeignKey, BelongsTo, BelongsToMany } from 'sequelize-typescript'
import { tb_like } from './tb_like'
import { User } from './user'

@Table
export class Post extends Model {
  @Column
  title!: string

  @Column
  image!: string

  @Column
  topcolor!: string

  @Column
  bottomcolor!: string

  @Column
  likeCount!: number

  @Column
  isPublic!: boolean

  @ForeignKey(() => User)
  @Column
  userId!: number

  @BelongsTo(() => User)
  user!: User

  @BelongsToMany(() => User, () => tb_like)
  like!: User[]

}
