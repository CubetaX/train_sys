const query = require('./mysql')

const db = {
  async getUser(id) {console.log("test~~")
    const sql = `select * from person where ID="${id}"`;
    return await query(sql);
  },
}
module.exports = db;
