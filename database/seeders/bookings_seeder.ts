import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Booking from '../../app/models/booking.js'
import { DateTime } from 'luxon'

export default class BookingSeeder extends BaseSeeder {
  public async run () {
    await Booking.createMany([
      {
        id_user: 1,
        id_fasilitas: 1,
        no_ruang: 'A101',
        tgl_pinjam: DateTime.fromISO('2025-10-20T08:00:00'),
        tgl_kembali: DateTime.fromISO('2025-10-21T17:00:00'),
        status: 'Disetujui',
      },
      {
        id_user: 2,
        id_fasilitas: 2,
        no_ruang: 'B201',
        tgl_pinjam: DateTime.fromISO('2025-10-22T09:00:00'),
        tgl_kembali: DateTime.fromISO('2025-10-23T16:00:00'),
        status: 'Menunggu',
      },
    ])
  }
}