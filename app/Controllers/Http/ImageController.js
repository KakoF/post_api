'use strict'

const Helpers = use('Helpers')

class ImageController {
    async index ({ params, response }) {
        return response.download(Helpers.tmpPath(`post/${params.id}/${params.path}`))
    }
}

module.exports = ImageController
