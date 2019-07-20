const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    ID: String,
    MALL_CATEGORY_NAME: String,
    IMAGE: String,
    TYPE: Number,
    SORT: Number,
    COMMENTS: String,
});

mongoose.model("Category", categorySchema);
