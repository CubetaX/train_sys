const Router = require('koa-router')
const handle = require('../handlers/user-handler')
let user = new Router();
user.post('/login',handle.login)
  .post('/sign',handle.sign)
  .get('/logout',handle.logout);
module.exports = user;
