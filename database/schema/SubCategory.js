const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subCategorySchema = new Schema({
    ID: { unique: true, type: String },
    MALL_CATEGORY_ID: String,
    MALL_SUB_NAME: String,
    COMMENTS: String,
    SORT: Number,
});

mongoose.model("SubCategory", subCategorySchema);
