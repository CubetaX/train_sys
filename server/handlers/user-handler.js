
const query = require('../sql/mysql')
const user = {   //路由操作

  async login(ctx) {
    console.log('login~~')
    sql = `select id,password,authority,name from person where id="${ctx.request.body.username}"`;
    try {
      let user = await query(sql);
    console.log(user);  //[ RowDataPacket { name: 'hqb', password: '123', count: 123 } ]
    user = user[0];
    if (!user) {//账号不存在
      ctx.response.body = -1
    }
    else if (user.password !== ctx.request.body.password) {//密码错误
      ctx.response.body = 0
    }
    else{ //管理员

      ctx.response.body = user; //ok
       console.log("login ok!")
    }
    }catch (e) {
      console.error(e);
    }
  },
  async sign(ctx) {
    try {
      await db.signUpUser(ctx); //reject失败后不会执行后续，转向catch
      ctx.body = 1;
    } catch (e) {
      ctx.body = -1;
      console.log(e)   //失败后也会继续执行
    }
    console.log("注册流程完成")
    //ctx.redirect('/') 会导致注册失败 即返回值
  },
  async logout(ctx){
  },
  async getOneStaff(ctx){
    const sql = `select * from person where id=${ctx.params.id}`;
    try {
      let result = await query(sql);
      console.log("get one staff ok")
      ctx.response.body = result;
    }catch (e) {
      console.error(e)
      console.log("get one staff wrong")
    }
  },
};
module.exports = user;
