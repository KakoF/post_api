'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AlterPostSchema extends Schema {
  up () {
    this.alter('posts', (table) => {
      table.string('image').nullable()
    })
  }
   down () {
    this.table('posts', (table) => {
      // reverse alternations
    })
  }
}

module.exports = AlterPostSchema
