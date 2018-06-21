const Koa = require ('koa');
const app = new Koa();
const Router = require('koa-router');
const router = require('./router.js')
//const session = require('koa-session')
const bodyParser = require('koa-bodyparser');
const config = require('./config');
app.use(bodyParser());

//app.keys = ['secret'];
//app.use(session(config.session,app));
app.use(router.routes());
app.listen(3000);
console.log("listen 3000")
