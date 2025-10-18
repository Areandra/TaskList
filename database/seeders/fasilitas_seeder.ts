import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Fasilitas from '../../app/models/fasilita.js'

export default class FasilitasSeeder extends BaseSeeder {
  public async run () {
    await Fasilitas.createMany([
      { nama: 'Ruang Rapat A', status: 'Tersedia' },
      { nama: 'Ruang Rapat B', status: 'Digunakan' },
      { nama: 'Lab Komputer 1', status: 'Perawatan' },
      { nama: 'Lab Komputer 2', status: 'Tersedia' },
    ])
  }
}