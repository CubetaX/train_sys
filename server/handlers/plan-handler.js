const xlsx = require('node-xlsx')
const query = require('../sql/mysql')
const plan = {
  async getPlan(ctx) {
    console.log("get all planSTaff")
    console.log("query",ctx.params.id);

    const sql = `select * from planstaff where course_id=${ctx.params.id} `;
    try {
      let result = await query(sql)
      ctx.response.body = result
      console.log(result);
      const sql2 = `select person_id,person_name,sex,department_name,score,apprisement_name,exam_date from planstaff where course_id=${ctx.params.id} `;
      let data = [['ID','姓名','性别','部门','分数','评价','考核日期']]
      console.log(data[1])
      for (let i=0;i<result.length;i++){
        data[i+1]=[];
        for (let attr in result[i]){
          data[i+1].push(result[i][attr])
        }
      }
      console.log(data)
    }catch(e){
      console.error(e)
    }

  },
  async deletePlan(ctx) {
    console.log(ctx.request.body);
    console.log("deleteplan");
    let plan = ctx.request.body;
    const sql = `delete from training_plan where id=${plan.id}`;
    const sql2 =`update course set selectedNum=selectedNum-1 where id=${plan.course_id}`
    let result = await  query(sql);
    let result2 = await  query(sql2);
    ctx.response.body = result
  },
  async postPlan(ctx) {
    let plan = ctx.request.body.plan;
    console.log(ctx.request.body.plan);
    plan.id = function RndNum(n){
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
