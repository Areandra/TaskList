import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class Fasilitas extends BaseModel {
  public static table = 'fasilitas'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nama: string

  @column()
  declare status: 'Tersedia' | 'Digunakan' | 'Perawatan'

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}