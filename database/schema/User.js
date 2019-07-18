const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
// 创建用户schema
const userSchema = new Schema({
    id: ObjectId,
    userName: { unique: true, type: String },
    password: String,
    creatAt: { type: Date, default: Date.now() },
    lastLoginAt: { type: Date, default: Date.now() },
});

userSchema.pre("save", function (next) {
    console.log(this);
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) {
            return next(err);
        }
        console.log("salt:" + salt);
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) {
                return next(err);
            }
            this.password = hash;
            console.log("hash:" + hash);
            console.log("password：" + this.password);
            next();
        })
    })
});

userSchema.methods = {
    // 密码比对方法
    validatePassword: (_password, password) => {
        return new Promise((resovle, reject) => {
            bcrypt.compare(_password, password, (err, isMatch) => {
                if (!err) {
                    resovle(isMatch);
                } else {
                    reject(err);
                }
            })
        })
    }
}

// 发布模型
mongoose.model('User', userSchema);
