const mongoose = require('mongoose');
const db = "mongodb://localhost/smile-db";
const glob = require('glob');
const { resolve } = require('path');

exports.initSchemas = () => {
    glob.sync(resolve(__dirname, 'schema', '**/*.js')).forEach(require);
}

exports.connect = () => {
    return new Promise((resolve, reject) => {
        mongoose.set('useCreateIndex', true); //去除控制台警告
        //连接数据库
        mongoose.connect(db, { useNewUrlParser: true });

        let maxConnectTimes = 0;

        //增加数据库连接监听事件
        mongoose.connection.on('disconnected', () => {
            console.log("************数据库连接断开*******************");
            if (maxConnectTimes < 3) {
                maxConnectTimes++;
                mongoose.connect(db, { useNewUrlParser: true });
            } else {
                reject();
                throw new Error("数据库出现问题请人为修理。。。。");
            }
        });

        // 数据连接出现错误的时候
        mongoose.connection.on('error', (error) => {
            console.log("******************数据库错误********************");
            if (maxConnectTimes < 3) {
                maxConnectTimes++;
                mongoose.connect(db, { useNewUrlParser: true });
            } else {
                reject(error);
                throw new Error("数据库出现问题请人为修理。。。。");
            }
        });

        // 数据库连接打开的时候
        mongoose.connection.once('open', () => {
            console.log("mongodb connected successfully!!!!.....");
            resolve();
        });
    })
}
