const Router = require('koa-router');
const handler = require('../handlers/dep-handler')
let dep = new Router();
dep.get('/dep',handler.getDep)

module.exports = dep;
