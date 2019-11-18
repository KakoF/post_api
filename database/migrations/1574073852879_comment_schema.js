'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CommentSchema extends Schema {
  up () {
    this.create('comments', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').
        inTable('users').onUpdate('CASCADE').onDelete('CASCADE')
      table.integer('post_id').unsigned().references('id').
        inTable('posts').onUpdate('CASCADE').onDelete('CASCADE')
      table.text('comentario').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('comments')
  }
}

module.exports = CommentSchema
