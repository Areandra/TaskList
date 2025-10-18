import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '../../app/models/user.js'
import hash from '@adonisjs/core/services/hash'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    const users: Array<{
      username: string
      email: string
      password: string
      role: 'admin' | 'user'
    }> = [
      {
        username: 'Latifa',
        email: 'tifa@example.com',
        password: await hash.make('123456'),
        role: 'admin',
      },
      {
        username: 'Adnan',
        email: 'nan@example.com',
        password: await hash.make('123456'),
        role: 'user',
      },
      {
        username: 'Ariel',
        email: 'areandra@example.com',
        password: await hash.make('123456'),
        role: 'user',
      },
      {
        username: 'Aca',
        email: 'aca@example.com',
        password: await hash.make('123456'),
        role: 'user',
      },
    ]

    for (const u of users) {
      await User.firstOrCreate({ email: u.email }, u)
    }
  }
}
