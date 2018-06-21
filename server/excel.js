const Koa = require('koa');
const Router = require('koa-router');
const xlsx = require('node-xlsx');
const fs = require('fs');
let router =new Router();
let app =new Koa();
const send = require('koa-send')

router.get('/test', async function(ctx) {
 //  const path = './test.xlsx'
  // ctx.attachment(path);
  // await  send(ctx,path);
  // const path="F:/ftproot/NW.js.docx";
  const data = [['哦', 2, 3], [true, false, null, '哈哈'], ['foo', 'bar', new Date('2014-02-19T14:30Z'), '0.3'], ['baz', null, 'qux']];
  let buffer = xlsx.build([{name: "mySheetName", data: data}]); // Returns a buffer
   //const buffer = fs.readFileSync(path);
  ctx.response.set({
    'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'Content-Disposition': 'attachment; filename=test.xlsx'
  });
  ctx.body = buffer;

})
app.use(router.routes())
app.use(router.allowedMethods())
app.listen(4000);
console.log("4000");
