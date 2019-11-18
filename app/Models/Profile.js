'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Profile extends Model {
  
  //TENTAR RETIRAR O INCREMENTO DA MIGRATION E UTILIZAR A LÓGICA JÁ EXISTENTE PARA GERENCIAR O PERFIL
  static get primaryKey () {
    return 'user_id'
  }
  
  users () {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Profile
