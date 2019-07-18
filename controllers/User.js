const Router = require('koa-router');
const router = new Router();
const mongoose = require('mongoose');

router.get("/", async (ctx) => {
    ctx.body = "这是用户操作首页";
});

router.post("/regist", async (ctx) => {
    // 取得model
    const User = mongoose.model('User');
    // 把从前端接收的POST数据封装成一个User对象
    const newUser = new User(ctx.request.body);
    // 用mongoose的save方法存储，然后判断结果，并返回相应信息
    await newUser.save().then(() => {
        // 成功后返回code=200,并返回注册成功提示信息
        ctx.body = {
            code: 200,
            message: '注册成功',
        }
    }).catch((error) => {
        // 出错时返回code=500,并返回错误信息
        ctx.body = {
            code: 500,
            message: error,
        }
    })
});

module.exports = router;
