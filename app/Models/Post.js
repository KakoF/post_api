'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Post extends Model {

  users () {
    return this.belongsTo('App/Models/User')
  }
  comments () {
    return this.hasMany('App/Models/Comment')
  }

  static validationRules () {
    const erroMessage = {
      'titulo.required': 'Título é obrigatório',
      'titulo.min': 'Título deve ter no mínimo 1 caractere',
      'conteudo.required': 'Conteúdo é obrigatóri',
      'conteudo.min': 'Conteúdo deve ter no mínimo 1 caractere',
    }
    return erroMessage
  }
}

module.exports = Post
