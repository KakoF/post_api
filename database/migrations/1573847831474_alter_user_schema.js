'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AlterUserSchema extends Schema {
  up () {
    this.alter('users', (table) => {
      table.integer('role_id').unsigned().references('id').
      inTable('roles')
      //.defaultTo(2)
    })
  }

  /*down () {
    this.table('alter_users', (table) => {
      // reverse alternations
    })
  }*/
}

module.exports = AlterUserSchema
