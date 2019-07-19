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

router.post("/login", async (ctx) => {
    // 取得前台提交过来的用户登陆数据
    const loginUser = ctx.request.body;
    console.log('********************loginUser****************');
    console.log(loginUser);
    // 取出用户名、密码
    const userName = loginUser.userName;
    const password = loginUser.password;

    // 取得model
    const User = mongoose.model('User');

    // 首先查找用户名是否存在
    await User.findOne({ userName: userName }).exec().then(async (result) => {
        console.log('********************result****************');
        console.log(result);
        // 用户存在则进行密码验证
        if (result) {
            /**
             * 因为validatePassword是实例方法，
             * 所以要先创建实例后才能调用该方法
             */
            const newUser = new User();
            await newUser.validatePassword(password, result.password).then((isMatch) => {
                // 比对成功，返回成功结果
                console.log('********************isMatch****************');
                console.log(isMatch);
                ctx.body = {
                    code: 200,
                    message: isMatch,
                };
            }).catch((err) => {
                // 比对出错，返回出错信息
                console.log(err);
                ctx.body = {
                    code: 500,
                    message: err,
                };
            });
        } else {
            // 用户不存在
            ctx.body = {
                code: 201,
                message: '用户名不存在',
            }
        }
    }).catch((err) => {
        console.log(err);
        ctx.body = {
            code: 500,
            message: err,
        }
    });

});

module.exports = router;
