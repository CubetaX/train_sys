const Router = require('koa-router');
const user = require('./router/user')
const staff = require('./router/staff')
const course = require('./router/course')
const plan = require('./router/plan')
const dep = require('./router/dep')
let router = Router();
router.use('/api',user.routes())
router.use('/api',staff.routes())
router.use('/api',course.routes())
router.use('/api',plan.routes())
router.use('/api',dep.routes())
module.exports = router;
