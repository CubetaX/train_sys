const Router = require('koa-router')
const handler = require('../handlers/staff-handler')
let staff = new Router();
 staff.get('/staff',handler.getAllStaff)
   .get('/staff/:key',handler.searchStaff)
   .delete('/staff',handler.deleteStaff)
   .post('/staff',handler.postStaff)
   .put('/staff',handler.updateStaff)
module.exports = staff;
