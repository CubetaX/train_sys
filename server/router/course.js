const Router = require('koa-router')
const handler = require('../handlers/course-handler')
let course = new Router();
course.get('/course',handler.getAllCourse)
  .get('/course/:key',handler.searchCourse)
  .delete('/course',handler.deleteCourse)
  .post('/course',handler.postCourse)
  .put('/course',handler.updateCourse)
module.exports = course;
