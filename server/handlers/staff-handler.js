
const query = require('../sql/mysql')
const staff = {
  async getAllStaff(ctx) {
    console.log("get all staff loading")
    const sql = "select * from person";
    try {
      let result = await query(sql);
      console.log("get all staff ok")
      ctx.response.body = result;
    }catch (e) {
      console.error(e)
      console.log("get all staff wrong")
    }
  },

  async deleteStaff(ctx) {
    console.log(ctx.request.body);
    console.log("deleteStaff");
    const sql = `delete from person where id=${ctx.request.body.id}`;
    let result = await  query(sql);
    ctx.response.body = result
  },
  async postStaff(ctx) {
    let staff = ctx.request.body.staff;
    console.log(ctx.request.body)
    const sql = `insert into person (id, password, authority, name, sex, birthday, job, edu, speciaty, address, tel, email, state, remark, department_id)
     values("${staff.id}", "${staff.password}", ${staff.authority}, "${staff.name}", "${staff.sex}", "${staff.birthday}", "${staff.job}", "${staff.edu}", "${staff.speciaty}", "${staff.address}", "${staff.tel}", "${staff.email}", ${staff.state}, "${staff.remark}", ${staff.department_id})`
     try {
       let result = await query(sql);
       ctx.response.body = result;
     }catch(e){
      console.error(e);
      ctx.response.body = -1;
      console.log("post WRONG")
     }
    console.log("post OK")
  },
  async updateStaff(ctx){
    console.log("update staff loading");

    let  staff = ctx.request.body.staff;
    let  oldId = ctx.request.body.oldId;

    console.log(staff,oldId);
    const sql = `update person set id="${staff.id}", password="${staff.password}", authority= ${staff.authority},name="${staff.name}", sex="${staff.sex}", birthday="${staff.birthday}", job="${staff.job}", edu="${staff.edu}", speciaty="${staff.speciaty}", address="${staff.address}", tel="${staff.tel}", email="${staff.email}", state=${staff.state}, remark="${staff.remark}", department_id=${staff.department_id} where id=${oldId}`;
    try {
      let result = await  query(sql);
      ctx.response.body = result
    }catch (e) {
      ctx.response.body = -1
    }

  },
  async searchStaff(ctx){
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


module.exports = staff;
