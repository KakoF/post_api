'use strict'

const User = use('App/Models/User')
const { validateAll } = use('Validator')
class UserController {
  
  async register ({ auth, request, response }) {
    try {
      const validation = await validateAll(request.all(), {
        username: 'required|min:5|unique:users',
        email: 'required|email|unique:users',
        password: 'required|min:6'
      }, User.validationRules())

      if(validation.fails()){
      return response.status(401).send({message: validation.messages()})
      }

      const data = request.only(["username", "email", "password"])
      const user = await User.create(data)
      let token = await auth.generate(user)
      return token
    } catch (err) {
        return response
          .status(500)
          .send({erro: `Erro: ${err.message}`})
    }
  }
   async login ({ request, response, auth }) {
    try {

      const { email, password } = request.all()
      const token = await auth.withRefreshToken().attempt(email, password)
      return token

    } catch (err) {
      return response
        .status(500)
        .send({ erro: `Erro: ${err.message}` })
    }
  }


  /*async login ({ request, response, auth }) {
    try {

      const {email, password} = request.all()
      const token = await auth.withRefreshToken().attempt(email, password)
      let user = await User.findBy('email', email)
      return { token, user: { email: user.email, username: user.username } }

    } catch (err) {
        return response
          .status(500)
          .send({erro: `Erro: ${err.message}`})
    }
  }*/

  
  async user ({ response, auth }) {
    try {

      const userAuth = await auth.getUser()
      if(userAuth){
        const user = await User.query().select('username', 'email', 'role_id').where('id', userAuth.id).with('role', (builder) => builder.select('id', 'role_name')).fetch()
        return {user: user}
      }else{
        return response
        .status(500)
        .send({erro: `Erro: Usuário não autenticado`})
      }
    } catch (err) {
        return response
          .status(500)
          .send({erro: `Erro: ${err.message}`})
    }
  }
 
  async refresh ({ request, response, auth }) {
    try {
    const refreshToken = request.input('refresh_token')
    return await auth.generateForRefreshToken(refreshToken)
    } catch (err) {
      return response
        .status(500)
        .send({ erro: `Erro: ${err.message}` })
    }
  }

  async logout ({ response, auth }) {
    try {
      const check = await auth.check()
      if(check){
        await auth.user.tokens()
                        .where('type', 'jwt_refresh_token')
                        .update({is_revoked: true})
      }

    } catch (err) {
        return response
          .status(500)
          .send({erro: `Erro: ${err.message}`})
    }
  }
}

module.exports = UserController
