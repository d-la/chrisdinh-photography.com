const mongoose = require('mongoose');
const SubCategory = require('./subcategory');

const photoSchema = new mongoose.Schema({
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
    subCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory'
    }
});

const Photo = mongoose.model('Photo', photoSchema);
module.exports = Photo;