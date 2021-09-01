import { Table, Column, Model, HasMany, ForeignKey, BelongsTo, BelongsToMany, Default } from 'sequelize-typescript'
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

  @Default(0)
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
  userlike!: User[]

  @HasMany(() => tb_like)
  like!: tb_like[]

}
