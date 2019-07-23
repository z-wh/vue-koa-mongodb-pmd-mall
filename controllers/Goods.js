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
                console.log(value.NAME);
                console.log("商品信息插入成功:" + i + "index:" + index);
            }).catch(err => {
                console.log("商品插入失败:" + err);
            })
        })
    });

    ctx.body = "开始批量导入全部商品信息";
});

router.get('/insertAllCategoryInfo', async (ctx) => {
    fs.readFile('./datajson/category.json', 'utf8', (err, data) => {
        let i = 0;
        data = JSON.parse(data);
        const Category = mongoose.model('Category');
        data.RECORDS.map((value) => {
            let newCategory = new Category(value);
            newCategory.save().then(() => {
                i++;
                console.log(value.MALL_CATEGORY_NAME);
                console.log("商品大类插入成功:" + i);
            }).catch((err) => {
                console.log(err);
            });
        })
    })

    ctx.body = "开始批量导入商品大类信息";
});

router.get('/insertAllSubCategoryInfo', async (ctx) => {
    fs.readFile('./datajson/categorySub.json', 'utf8', (err, data) => {
        let i = 0;
        data = JSON.parse(data);
        const SubCategory = mongoose.model("SubCategory");
        data.RECORDS.map((value, index) => {
            const newSubCategory = new SubCategory(value);
            newSubCategory.save().then(() => {
                i++;
                console.log(value.MALL_SUB_NAME + ":" + i + "index:" + index);
            }).catch((err) => {
                console.log(err);
            });
        });
    });

    ctx.body = "开始批量导入商品子类信息";
});

router.post('/getGoodsDetailInfo', async (ctx) => {
    try {
        /**
         * 从请求中取得商品ID
         * 根据ID查找商品详情
         */
        const goodsId = ctx.request.body.goodsId;
        const Goods = mongoose.model('Goods');
        const result = await Goods.findOne({ ID: goodsId }).exec();
        ctx.body = {
            code: 200,
            message: result,
        };
    } catch (err) {
        ctx.body = {
            code: 500,
            message: err,
        };
    }
});

router.get('/getCategoryList', async (ctx) => {
    try {
        const Category = mongoose.model("Category");
        const result = await Category.find().exec();
        ctx.body = {
            code: 200,
            message: result,
        };
    } catch (err) {
        ctx.body = {
            code: 500,
            message: err,
        };
    }
});

router.post('/getSubCategoryList', async (ctx) => {
    try {
        const categoryId = ctx.request.body.categoryId;
        const SubCategory = mongoose.model('SubCategory');
        const result = await SubCategory.find({ MALL_CATEGORY_ID: categoryId }).exec();
        ctx.body = {
            code: 200,
            message: result,
        }
    } catch (err) {
        ctx.body = {
            code: 500,
            message: err,
        }
    }
});

router.post('/getGoodsListBySubCategoryId', async (ctx) => {
    try {
        console.log("------------------------------------------------------------")
        console.log("body:" + JSON.stringify(ctx.request.body));
        const subCategoryId = ctx.request.body.subCategoryId;
        console.log("******************subCategoryId*******************")
        console.log(subCategoryId);
        const page = ctx.request.body.page;
        const pageSize = 10;
        const start = (page - 1) * pageSize;
        const Goods = mongoose.model("Goods");
        const result = await Goods.find({SUB_ID: subCategoryId}).skip(start).limit(pageSize).exec();
        ctx.body = {
            code: 200,
            message: result,
        };
    } catch (err) {
        ctx.body = {
            code: 500,
            message: err,
        };
        console.log(err);
    }
})

module.exports = router;
