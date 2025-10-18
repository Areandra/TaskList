import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import User from './user.js'
import Fasilitas from './fasilita.js'
import { DateTime } from 'luxon'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { Field, ID, Int, ObjectType } from '@foadonis/graphql'


@ObjectType()
export default class Booking extends BaseModel {
  public static table = 'bookings'

  @column({ isPrimary: true })
  @Field(() => ID)
  declare id: number

  @column()
  @Field(() => Int)
  declare id_user: number

  @column()
  @Field()
  declare id_fasilitas: number

  @column()
  declare no_ruang: string

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare tgl_pinjam: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare tgl_kembali: DateTime

  @column()
  declare status: 'Disetujui' | 'Dibatalkan' | 'Menunggu' | 'Dikembalikan' | 'Digunakan'

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User, { foreignKey: 'id' })
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Fasilitas, { foreignKey: 'id' })
  declare fasilitas: BelongsTo<typeof Fasilitas>
}