const Koa = require('koa');
const Router = require('koa-router');
const mongoose = require('mongoose');
const { connect, initSchemas } = require('./database/init.js');
const app = new Koa();
const user = require('./controllers/User');
const bodyParser = require('koa-bodyparser');
const cors = require('koa-cors');

app.use(cors());
app.use(bodyParser());

// 装载子路由
const router = new Router();
router.use('/user', user.routes());

/**
 * 开启路由中间件
 * allowedMethods处理的业务是当所有路由中间件执行完成之后,
 * 若ctx.status为空或者404的时候,丰富response对象的header头.
 */
app.use(router.routes());
app.use(router.allowedMethods());

(async () => {
    console.log("start....");
    await connect();
    //初始化引入schema数据库映射
    initSchemas();
})();

app.use(async (ctx) => {
    ctx.body = "<h1>hello koa!</h1>";
});

app.listen(3000);
console.log('App is running at http://localhost:3000.....');
