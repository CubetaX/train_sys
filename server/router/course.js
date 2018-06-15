const Router = require('koa-router')
const handler = require('../handlers/course-handler')
let course = new Router();
course.get('/course',handler.getAllCourse)
  .delete('/course',handler.deleteCourse)
  .post('/course',handler.postCourse)
module.exports = course;
