'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const { validateAll } = use('Validator')
const Post = use('App/Models/Post')
const Comment = use('App/Models/Comment')
/**
 * Resourceful controller for interacting with comments
 */
class CommentController {
  /**
   * Create/save a new comment.
   * POST comments
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ params, request, response, auth }) {
    //return params.post_id
    try {
      const validation = await validateAll(request.all(), {
        comentario: 'required|min:1',
      }, Comment.validationRules())

      if (validation.fails()) {
        return response.status(401).send({ message: validation.messages() })
      }
      const post = await Post.find(params.post_id)
      if(!post){
        return response
        .status(500)
        .send({ erro: `Erro: Post não encontrado` })
      }
      const data = request.only(['comentario'])
      const comment = await Comment.create({ ...data, user_id: auth.user.id, post_id: post.id })
      return comment
    } catch (err) {
    return response
      .status(500)
      .send({ erro: `Erro: ${err.message}` })
    }
  }
  /**
   * Update comment details.
   * PUT or PATCH comments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response, auth }) {

    //return params.post_id
    //return params.id
    try {
      const validation = await validateAll(request.all(), {
        comentario: 'required|min:1',
      }, Comment.validationRules())

      if (validation.fails()) {
        return response.status(401).send({ message: validation.messages() })
      }
      const post = await Post.find(params.post_id)
      if(!post){
        return response
        .status(500)
        .send({ erro: `Erro: Post não encontrado` })
      }
      const comment = await Comment.find(params.id)
      if (comment.user_id !== auth.user.id) {
        return response.status(401).send({ message: 'Operação não permitida' })
      }
      if(!comment){
        return response
        .status(500)
        .send({ erro: `Erro: Comentário não encontrado` })
      }
      const data = request.only(["comentario"])

      comment.merge(data);
      await comment.save();
      return comment
      
    } catch (err) {
      return response
        .status(500)
        .send({ erro: `Erro: ${err.message}` })
    }
    return 'update'
  }

  /**
   * Delete a comment with id.
   * DELETE comments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response, auth }) {
    try {
      const post = await Post.find(params.post_id)
      if(!post){
        return response
        .status(500)
        .send({ erro: `Erro: Post não encontrado` })
      }
      const comment = await Comment.find(params.id)
      if(!comment){
        return response
        .status(500)
        .send({ erro: `Erro: Comentário não encontrado` })
      }
      if (comment.user_id !== auth.user.id) {
        return response.status(401).send({ message: 'Operação não permitida' })
      }
      return await comment.delete();
    } catch (err) {
      return response
        .status(500)
        .send({ erro: `Erro: ${err.message}` })
    }
  }
}

module.exports = CommentController
