const Router = require('koa-router')
const handler = require('../handlers/plan-handler')
let plan = new Router();
plan.get('/plan',handler.getPlan)
  .delete('/plan',handler.deletePlan)
  .post('/plan',handler.postPlan)
  .put('/plan',handler.updatePlan)
module.exports = plan;
