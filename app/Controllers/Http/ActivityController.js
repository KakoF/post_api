'use strict'

const Database = use('Database')

class ActivityController {

    async chartPosts ({ request, response, auth }) {
        try {
            const totalPost = await Database
                .from('posts')
                .count()
            const countPosts = await Database
            .from('posts').where('user_id', auth.user.id)
            .count()
            const otherPosts = await Database
            .from('posts').where('user_id', '<>', auth.user.id)
            .count()
          return {totalPost, countPosts, otherPosts}
        } catch (err) {
        return response
          .status(500)
          .send({ erro: `Erro: ${err.message}` })
        }
      }

}

module.exports = ActivityController
