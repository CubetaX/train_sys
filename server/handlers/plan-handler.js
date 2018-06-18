
const query = require('../sql/mysql')
const plan = {
  async getPlan(ctx) {
    console.log("get all planSTaff")
    console.log("test",ctx.params);
    const sql = `select * from planstaff where course_id=${ctx.params.id} `;
    try {
      let result = await query(sql);
      ctx.response.body = result
    }catch(e){
      console.error(e)
    }

  },
  async deletePlan(ctx) {
    console.log(ctx.request.body);
    console.log("deletecourse");
    const sql = `delete from course where id=${ctx.request.body.id}`;
    let result = await  query(sql);
    ctx.response.body = result
  },
  async postPlan(ctx) {
    let course = ctx.request.body.course;
    console.log(ctx.request.body.course);
    const sql = `insert into course (id, name, teacher_id, intro, book, classroom, number, classtime, course_state_code,selectedNum)
     values(${course.id}, "${course.name}", ${course.teacher_id}, "${course.intro}", "${course.book}", "${course.classroom}"
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
  async updatePlan(ctx){
    console.log("update course loading");

    let  course = ctx.request.body.course;
    let  oldId = ctx.request.body.oldId;

    console.log(course,oldId);
    const sql = `update person set id="${course.id}", teacher_id=${course.teacher_id}, intro= "${course.intro}", 
    name="${course.name}", classroom="${course.classroom}", book="${course.book}", classtime="${course.classtime}", number="${course.number}", selectedNum="${course.selectedNum}", course_state_code="${course.course_state_code}",
    where id=${oldId}`;
    try {
      let result = await  query(sql);
      ctx.response.body = result
    }catch (e) {
      ctx.response.body = -1
    }

  },
  async searchPlanStaff(ctx){
    console.log("seaching loading")
    let key = ctx.params.key;
    console.log(key);
    const sql = `SELECT person.* FROM train.person left outer join train.department on person.department_id=train.department.id where department.name like "${key}%" or person.id="${key}" or person.name like "${key}%" or person.sex="${key}" or person.job="${key}" or person.tel ="${key}" `;
    console.log(sql);
    try {
      let result = await  query(sql);
      ctx.response.body = result
      console.log("search ok")
    }catch (e) {
      ctx.response.body = -1
      console.log("search wrong")
      console.log(err)
    }
  },

}


module.exports = plan;
