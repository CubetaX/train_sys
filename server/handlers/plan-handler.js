const fs = require('fs')
const xlsx = require('node-xlsx')
const query = require('../sql/mysql')
const Buffer = require('buffer').Buffer
const plan = {
  async getExcel(ctx){

    console.log('get excel')
    let courseName = await query(`select name from course where id=${ctx.params.id}`);
    courseName = courseName[0].name;
    let test = Buffer.from(courseName+"成绩总单"+'.xlsx');

    const sql = `select person_id,name,sex,department_name,score,apprisement_name,exam_date from planstaff where course_id=${ctx.params.id} `;
    try {
      let result = await query(sql);
      let data = [['ID','姓名','性别','部门','分数','评价','考核日期']];
      for (let i=0;i<result.length;i++){
        data[i+1]=[];
        for (let attr in result[i]){  //read first seven attr  /no courseName
          data[i+1].push(result[i][attr])
        }
      }
      let buffer = xlsx.build([{name: courseName, data: data}])
      ctx.set({
        'connection':'keep-alive',
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': "attachment; filename="+encodeURIComponent(test)   //encode！！！！！全局变量
      });
      ctx.body = buffer;
    }catch (e) {
      console.error(e)
    }
  },
  async getStaffByCourse(ctx) {
    console.log("get all planSTaff")
    console.log("query",ctx.params.id);
    const sql = `select * from planstaff where course_id=${ctx.params.id} `;
    try {
      let result = await query(sql)
      ctx.response.body = result;
    }catch(e){
      console.error(e)
    }
  },
  async getCourseByStaff(ctx) {
    console.log("get all plan course")
    console.log("query",ctx.params.id);
    const sql = `select * from planstaff where person_id=${ctx.params.id} `;
    try {
      let result = await query(sql)
      ctx.response.body = result;
    }catch(e){
      console.error(e)
    }
  },
  async deletePlan(ctx) {
    console.log("deleteplan");
    let plan = ctx.request.body.plan;
    console.log(plan.id);
    console.log(plan.course_id);
    const sql = `delete from training_plan where id=${plan.id}`;
    const sql2 =`update course set selectedNum=selectedNum-1 where id=${plan.course_id}`
    try {
      let result = await  query(sql);
      let result2 = await  query(sql2);
      ctx.response.body = result
    }catch(e){
      console.error(e)
    }


  },
  async postPlan(ctx) {
    let plan = ctx.request.body.plan;
    console.log();
    plan['id'] = function RndNum(n){
      let rnd="";
      for(let i=0;i<n;i++)
        rnd+=Math.floor(Math.random()*10);
      return rnd;
    }(5);
    console.log(plan);
    const sql = `insert into training_plan (id,person_id,course_id,apprisement_state_code,score,exam_date) values(${plan.id}, ${plan.person_id}, ${plan.course_id}, ${plan.apprisement_code}, ${plan.score}, ${plan.exam_date})`;
    const sql2 =`update course set selectedNum=selectedNum+1 where id=${plan.course_id}`

    try {
      let result = await query(sql);
      let result2 = await query(sql2);
      ctx.response.body = result;
    } catch (e) {
      console.error(e);
      ctx.response.body = -1;
      console.log("post WRONG")
    }
    console.log("post OK")
  },
  async updatePlan(ctx){
    console.log("update plan loading");

    let  plan = ctx.request.body.plan;
    console.log(plan);
    let sql
    if (plan.exam_date == null || plan.exam_date == '')
       sql = `update training_plan set score=${plan.score}, exam_date= null, apprisement_state_code=${plan.apprisement_code} where id=${plan.id}`;
    else
       sql = `update training_plan set score=${plan.score}, exam_date= '${plan.exam_date}', apprisement_state_code=${plan.apprisement_code} where id=${plan.id}`
    try {
      let result = await  query(sql);
      ctx.response.body = result
    }catch (e) {
      console.error(e)
      ctx.response.body = -1
    }

  },
  async searchCourseByStaff(ctx){
    console.log("seaching loading")
    let id = ctx.params.id;
    let key = ctx.params.key;
    console.log(key);
    const sql = `select * from planstaff where person_id='${id}' and (course_name like '${key}%' or course_id = '${key}' or apprisement_name like '${key}%')`; //需要'' 否则会报错
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


module.exports = plan;
