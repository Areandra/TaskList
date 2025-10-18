import { BaseSeeder } from '@adonisjs/lucid/seeders'
import UserSeeder from './users_seeder.js'
import FasilitasSeeder from './fasilitas_seeder.js'
import BookingSeeder from './bookings_seeder.js'

export default class DatabaseSeeder extends BaseSeeder {
  public async run () {
    await new UserSeeder(this.client).run()
    await new FasilitasSeeder(this.client).run()
    await new BookingSeeder(this.client).run()
  }
}