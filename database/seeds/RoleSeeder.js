'use strict'

/*
|--------------------------------------------------------------------------
| RoleSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Database = use('Database')

class RoleSeeder {
  async run () {
    await Database.table('roles').insert([
    {
      id: 1,
      role_name: 'Administrador',
      created_at : new Date(),
      updated_at: new Date()
    },
    {
      id: 2,
      role_name: 'Usuário',
      created_at : new Date(),
      updated_at: new Date()
    }
    ])
  }
}

module.exports = RoleSeeder
