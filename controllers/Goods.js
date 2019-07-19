const mongoose = require('mongoose');
const fs = require('fs');
const router = require('koa-router')();

router.get('/insertAllGoodsInfo', async (ctx) => {

    fs.readFile('./datajson/newGoods.json', 'utf8', (err, data) => {
        let i = 0;
        let newData = JSON.parse(data);
        const Goods = mongoose.model('Goods');
        newData.map((value, index) => {
            const newGoods = new Goods(value);
            newGoods.save().then(() => {
                i++;
                console.log("商品信息插入成功:" + i);
            }).catch(err => {
                console.log("商品插入失败:" + err);
            })
        })
    });

    ctx.body = "开始批量导入全部商品信息";
});

module.exports = router;
