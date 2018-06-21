const Router = require('koa-router')
const handler = require('../handlers/plan-handler')
let plan = new Router();
plan.get('/plan/course/:id',handler.getStaffByCourse)
  .get('/plan/course/:id/excel',handler.getExcel)
  .get('/plan/staff/:id',handler.getCourseByStaff)
  .delete('/plan',handler.deletePlan)
  .post('/plan',handler.postPlan)
  .put('/plan',handler.updatePlan)
module.exports = plan;
