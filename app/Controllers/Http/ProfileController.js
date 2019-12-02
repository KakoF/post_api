'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Profile = use('App/Models/Profile')
const User = use('App/Models/User')
const Database = use('Database')
const Helpers = use('Helpers')

/**
 * Resourceful controller for interacting with profiles
 */
class ProfileController {

  /**
   * Display a single profile.
   * GET profiles/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ response, auth }) {
    try {
      let data = {}
      data.profile = await Profile.find(auth.user.id)
      if (data.profile) {
        data.user = await User.query().select('id', 'username').where('id', data.profile.user_id)
          .withCount('posts')
          .withCount('comments')
          .fetch()
        data.posts = await Database.from('posts').count()
        data.comments = await Database.from('comments').count()
      }
      return data
    } catch (err) {
      return response
        .status(500)
        .send({ erro: `Erro: ${err.message}` })
    }
  }

  async show ({ response, params }) {
    try {
      let data = {}
      data.profile = await Profile.find(params.user_id)
      if (data.profile) {
        data.user = await User.query().select('id', 'username').where('id', data.profile.user_id)
        .withCount('posts')
        .withCount('comments')
        .fetch()
      data.posts = await Database.from('posts').count()
      data.comments = await Database.from('comments').count()
      }
      return data
    } catch (err) {
      return response
        .status(500)
        .send({ erro: `Erro: ${err.message}` })
    }
  }

  /**
   * Create/save a new profile.
   * POST profiles
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    try {
      
      let data = null
      const profile = await Profile.findBy('user_id', auth.user.id)

      const profilePic = request.file('avatar', {
        types: ['image'],
        size: '10mb'
      })
      
      if(profilePic) {
        
        await profilePic.move(Helpers.tmpPath(`profile/${auth.user.id}`), {
          name: `profile${auth.user.id}.jpg`,
          overwrite: true
        })
       
        if (!profilePic.moved()) {
          return response
          .status(500)
          .send({ erro: `Erro: ${err.message}` })
        }
        data = `${profilePic.fileName}`
      }

      if(profile){
        profile.avatar = data
        return await profile.save()
      }else{
        const { id } = auth.user
        const new_profile = await Profile.create({user_id: id, avatar: data })
        return new_profile
      }
    } catch (err) {
      return response
        .status(500)
        .send({ erro: `Erro: ${err.message}` })
    }
  }
}

module.exports = ProfileController
