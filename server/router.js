const Router = require('koa-router');
const user = require('./router/user')
const staff = require('./router/staff')
const course = require('./router/course')
const plan = require('./router/plan')
let router = Router();
router.use('/api',user.routes())
router.use('/api',staff.routes())
router.use('/api',course.routes())
router.use('/api',plan.routes())
module.exports = router;
