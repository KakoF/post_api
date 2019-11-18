'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Database = use('Database')
const Hash = use('Hash')
class UserSeeder {
  async run () {
    await Database.table('users').insert([
      {
        id: 1,
        username: 'admin',
        email: 'admin@admin.com',
        password: await Hash.make('admin1234'),
        role_id: 1,
        created_at : new Date(),
        updated_at: new Date()
      }
      ])
  }
}

module.exports = UserSeeder
