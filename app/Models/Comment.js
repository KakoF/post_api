'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Comment extends Model {
  users () {
    return this.belongsTo('App/Models/User')
  }
  posts () {
    return this.belongsTo('App/Models/Post')
  }

  static validationRules () {
    const erroMessage = {
      'comentario.required': 'Comentário é obrigatório',
      'comentario.min': 'Comentário deve ter no mínimo 1 caractere',
    }
    return erroMessage
  }
}

module.exports = Comment
