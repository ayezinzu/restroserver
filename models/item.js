const mongoose = require('mongoose')
const itemSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    // category: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'category',
    //     required: true
    // },
    subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory',
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String
    },
    description: {
        type: String
    },
    isSpicy: {
        type: Boolean,
        default: false
    },
    addons: [{
        name: {
            type: String,
        },
        options: {
            type: String,
        },
        // price: {
        //     type: Number,
        //     required: true
        // },
        category: {
            type: String,
        }
    }],
    restaurant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    }
})

module.exports = mongoose.model('Item', itemSchema)