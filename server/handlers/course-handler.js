
const query = require('../sql/mysql')
const course = {
  async getAllCourse(ctx) {
    console.log("get all course")
    const sql = "SELECT id, name, teacher_id, intro, book, classroom, number, date_format(classtime,\"%Y-%m-%d\") as classtime, course_state_code, selectedNum FROM train.course;";
    let result = await query(sql);
    ctx.response.body = result
  },
  async deleteCourse(ctx) {
    console.log(ctx.request.body);
    console.log("delete course");
    const sql = `delete from course where id=${ctx.request.body.id}`;
    let result = await  query(sql);
    ctx.response.body = result
  },
  async postCourse(ctx) {
    let course = ctx.request.body.course;
    let sql;
    if (course.classtime == null || course.classtime == '')
    sql = `insert into course (id, name, teacher_id, intro, book, classroom, number, classtime, course_state_code,selectedNum)
     values(${course.id}, "${course.name}", '${course.teacher_id}', "${course.intro}", "${course.book}", "${course.classroom}"
     ,${course.number},null, ${course.course_state_code}, ${course.selectedNum})`;
    else
      sql = `insert into course (id, name, teacher_id, intro, book, classroom, number, classtime, course_state_code,selectedNum)
     values(${course.id}, "${course.name}", '${course.teacher_id}', "${course.intro}", "${course.book}", "${course.classroom}"
     ,${course.number},"${course.classtime}", ${course.course_state_code}, ${course.selectedNum})`;
    let result = await query(sql);

    try {
      ctx.response.body = result;
    } catch (e) {
      console.error(e);
      ctx.response.body = -1;
      console.log("post WRONG")
    }
    console.log("post OK")
  },
  async updateCourse(ctx){
    console.log("update course loading");

    let  course = ctx.request.body.course;
    let  oldId = ctx.request.body.oldId;
    let sql;
    if (course.classtime == null || course.classtime == '')
       sql = `update course set id=${course.id}, teacher_id='${course.teacher_id}', intro= "${course.intro}",name="${course.name}", classroom="${course.classroom}", book="${course.book}", classtime=null, number=${course.number}, selectedNum=${course.selectedNum}, course_state_code=${course.course_state_code} where id=${oldId}`;
    else
       sql = `update course set id=${course.id}, teacher_id='${course.teacher_id}', intro= "${course.intro}",name="${course.name}", classroom="${course.classroom}", book="${course.book}", classtime="${course.classtime}", number=${course.number}, selectedNum=${course.selectedNum}, course_state_code=${course.course_state_code} where id=${oldId}`;

    try {
      let result = await  query(sql);
      ctx.response.body = result
    }catch (e) {
      console.error(e)
      ctx.response.body = -1
    }

  },
  async searchCourse(ctx){
    console.log("seaching loading")
    let key = ctx.params.key;
    console.log(key);
    const sql = `SELECT id, name, teacher_id, intro, book, classroom, number, date_format(classtime,\"%Y-%m-%d\") as classtime, course_state_code, selectedNum FROM train.course left join course_state on course.course_state_code=course_state.code where id='${key}' or name like '${key}%' or course_state.description like'${key}%'` ;
    console.log(sql);
    try {
      let result = await  query(sql);
      ctx.response.body = result
      console.log("search ok")
    }catch (e) {
      ctx.response.body = -1
      console.log("search wrong")
      console.error(e)
    }
  },

}


module.exports = course;
