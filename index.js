const Koa = require('koa');
const mongoose = require('mongoose');
const { connect, initSchemas } = require('./database/init.js');
const app = new Koa();

(async () => {
    console.log("start....");
    await connect();
    //初始化引入schema数据库映射
    initSchemas();
    const User = mongoose.model('User');
    const oneUser = new User({
        userName: 'Li Lei5',
        password: '123456',
    });
    oneUser.save().then(() => {
        console.log('数据插入成功');
    });

    let users =await User.find({}).exec();
    console.log("----------------------------");
    console.log(users);
    console.log("----------------------------");
})();

app.use(async (ctx) => {
    ctx.body = "<h1>hello koa!</h1>";
});

app.listen(3000);
console.log('App is running at http://localhost:3000.....');
