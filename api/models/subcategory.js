const mongoose = require('mongoose');
const Category = require('./category');

const subCategorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxLength: 160
    },
    description: {
        type: String,
        required: false,
        maxLength: 300
    },
    location: {
        type: String,
        required: false,
        maxLength: 100
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }
});

const SubCategory = mongoose.model('SubCategory', subCategorySchema);
module.exports = SubCategory;