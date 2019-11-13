'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PostSchema extends Schema {
  up () {
    this.create('posts', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').
        inTable('users').onUpdate('CASCADE').onDelete('CASCADE')
      table.string('titulo', 100).notNullable()
      table.string('sub_titulo', 250).nullable()
      table.text('conteudo').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('posts')
  }
}

module.exports = PostSchema
