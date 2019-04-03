const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxLength: 160
    }
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;