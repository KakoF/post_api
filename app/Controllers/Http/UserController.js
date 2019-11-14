'use strict'

const User = use('App/Models/User')
const { validateAll } = use('Validator')
class UserController {
  
  async register ({ request, response }) {
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
      return user
    } catch (err) {
        return response
          .status(500)
          .send({erro: `Erro: ${err.message}`})
    }
  }

  async login ({ request, response, auth }) {
    try {

      const {email, password} = request.all()
      const token = auth.withRefreshToken().attempt(email, password)
      //const token = auth.attempt(email, password)
      return token

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
