'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('register', 'UserController.register')
Route.post('login', 'UserController.login')

Route.get('image/:id/:path', 'ImageController.index')
//Route.get('image', 'ImageController.index')

Route.post('refresh', 'UserController.refresh').middleware('auth')
Route.get('logout', 'UserController.logout').middleware('auth')


Route.get('/posts', 'PostController.posts')
Route.get('perfil/:user_id', 'ProfileController.show')

Route.resource('post', 'PostController').apiOnly().middleware('auth')


/* Alternativa de agrupamento de rotas de POST de rotas, não utilizando o resource

Route.group(() => {
  Route.get('/', 'PostController.index')
  Route.get('/:id', 'PostController.show')
  Route.post('/', 'PostController.store')
  Route.put('/:id', 'PostController.update')
  Route.delete('/:id', 'PostController.destroy')
}).prefix('post').middleware('auth')

*/


Route.resource('perfil', 'ProfileController').only(['index', 'store']).middleware('auth')

Route.post('comentario/:post_id', 'CommentController.store').middleware('auth')
Route.put('comentario/:post_id/:id', 'CommentController.update').middleware('auth')
Route.delete('comentario/:post_id/:id', 'CommentController.destroy').middleware('auth')




/*Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})*/
