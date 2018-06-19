const query = require('../sql/mysql');
const dep = {
  async getDep(ctx) {
    console.log("get all dep loading")
    const sql = "select * from department";
    try {
      let result = await query(sql);
      console.log("get all dep ok")
      ctx.response.body = result;
    }catch (e) {
      console.error(e)
      console.log("get all dep wrong")
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
module.exports = dep;
