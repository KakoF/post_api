'use strict'


const { validateAll } = use('Validator')
const Post = use('App/Models/Post')
const Helpers = use('Helpers')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with posts
 */
class PostController {
  /**
   * Show a list of all posts.
   * GET posts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, auth }) {
    try {
    const posts = await Post.query().where('user_id', auth.user.id).fetch()
    return posts
    } catch (err) {
      return response
        .status(500)
        .send({ erro: `Erro: ${err.message}` })
    }
  }

  async posts ({ request, response, auth }) {
    try {
      const posts = await Post.query().with('users', (builder) => builder.select('id', 'username')).orderBy('created_at', 'desc').fetch()
      return posts
    } catch (err) {
      return response
        .status(500)
        .send({ erro: `Erro: ${err.message}` })
    }
  }

  /**
   * Create/save a new post.
   * POST posts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    try {

      const validation = await validateAll(request.all(), {
        titulo: 'required|min:1',
        conteudo: 'required|min:1'
      }, Post.validationRules())

      if (validation.fails()) {
        return response.status(401).send({ message: validation.messages() })
      }
      const { id } = auth.user
      const data = request.only([
        'titulo',
        'sub_titulo',
        'conteudo'
      ])

      const postPic = request.file('post_pic', {
        types: ['image'],
        size: '10mb'
      })
      
      if(postPic) {
        
        await postPic.move(Helpers.tmpPath(`post/${id}`), {
          name: `${Date.now()}-${data.titulo}.jpg`,
          overwrite: true
        })
       
        if (!postPic.moved()) {
          return response
          .status(500)
          .send({ erro: `Erro: ${err.message}` })
        }
        data.image = postPic.fileName
      }
      const post = await Post.create({ ...data, user_id: id })
      return post
    } catch (err) {
      return response
        .status(500)
        .send({ erro: `Erro: ${err.message}` })
    }
  }

  /**
   * Display a single post.
   * GET posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, auth, response }) {
    try {
      const post = await Post.query().where('id', params.id)
        .with('users', (builder) => {builder.select('id', 'username')})
        .with('comments', (builder) => {builder.select('post_id', 'id', 'comentario')}).first()
      if(!post){
        return response
        .status(500)
        .send({ erro: `Erro: Post não encontrado` })
      }
      if (post.user_id !== auth.user.id) {
        return response.status(401).send({ message: 'Operação não permitida' })
      }
      return post
    } catch (err) {
      return response
        .status(500)
        .send({ erro: `Erro: ${err.message}` })
    }
  }

  /**
   * Update post details.
   * PUT or PATCH posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ request, params, auth, response }) {
    try {
      const validation = await validateAll(request.all(), {
        titulo: 'required|min:1',
        conteudo: 'required|min:1'
      }, Post.validationRules())

      if (validation.fails()) {
        return response.status(401).send({ message: validation.messages() })
      }
      const post = await Post.find(params.id)
      if(!post){
        return response
        .status(500)
        .send({ erro: `Erro: Post não encontrado` })
      }
      if (post.user_id !== auth.user.id) {
        return response.status(401).send({ message: 'Operação não permitida' })
      }
      const data = request.only(["titulo", "sub_titulo", "conteudo"])

      post.merge(data);
      await post.save();
      return post
      
    } catch (err) {
      return response
        .status(500)
        .send({ erro: `Erro: ${err.message}` })
    }
  }

  /**
   * Delete a post with id.
   * DELETE posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, auth, response }) {
    try {
      const post = await Post.find(params.id)
      if(!post){
        return response
        .status(500)
        .send({ erro: `Erro: Post não encontrado` })
      }
      if (post.user_id !== auth.user.id) {
        return response.status(401).send({ message: 'Operação não permitida' })
      }
      return await post.delete();
    } catch (err) {
      return response
        .status(500)
        .send({ erro: `Erro: ${err.message}` })
    }
  }
}

module.exports = PostController
