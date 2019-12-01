'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

class User extends Model {
  
  static boot () {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens () {
    return this.hasMany('App/Models/Token')
  }

  posts () {
    return this.hasMany('App/Models/Post')
  }

  comments () {
    return this.hasMany('App/Models/Comment')
  }

  profile () {
    return this.hasOne('App/Models/Profile')
  }

  role () {
    return this.belongsTo('App/Models/Role')
  }

  static validationRules () {
    const erroMessage = {
      'username.required':'Nome de Usuário é obrigatório',
      'username.min':'Nome de Usuário deve ter no mínimo 5 caracteres',
      'username.unique':'Já existe um Usuário com esse Nome',
      'email.required':'E-mail é obrigatório',
      'email.email':'E-mail deve ser válido',
      'email.unique':'Já existe um Usuário com esse E-mail',
      'password.required':'Senha é obrigatória',
      'password.min':'Senha deve ter no mínimo 5 caracteres',
    }
    return erroMessage
  }
}

module.exports = User
