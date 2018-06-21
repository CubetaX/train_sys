const Router = require('koa-router')
const handler = require('../handlers/plan-handler')
let plan = new Router();
plan.get('/plan/:id',handler.getPlan)
  .get('/plan/:id/excel',handler.getExcel)
  .delete('/plan',handler.deletePlan)
  .post('/plan',handler.postPlan)
  .put('/plan',handler.updatePlan)
module.exports = plan;
