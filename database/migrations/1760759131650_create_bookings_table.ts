import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'bookings'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('id_user').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE')
      table
        .integer('id_fasilitas')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('fasilitas')
        .onDelete('CASCADE')
      table.string('no_ruang', 50).notNullable()
      table.date('tgl_pinjam').notNullable()
      table.date('tgl_kembali').notNullable()
      table
        .enum('status', ['Disetujui', 'Dibatalkan', 'Menunggu', 'Dikembalikan', 'Digunakan'])
        .defaultTo('Menunggu')
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
