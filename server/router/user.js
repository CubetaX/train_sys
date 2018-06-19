const Router = require('koa-router')
const handler = require('../handlers/user-handler')
let user = new Router();
user.post('/login',handler.login)
  .post('/sign',handler.sign)
  .get('/logout',handler.logout)
  .get('/user/:id',handler.getUserInfo)
module.exports = user;
