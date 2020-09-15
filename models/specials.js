const mongoose = require('mongoose')
const specialSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subcategory'
    },
    image: {
        type: String
    },
    isSpicy: {
        type: Boolean,
        default: false
    },
    day: {
        type: String,
        required: true
    },
    restaurant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    }
})

// monday: 1, tuesday: 2, wednesday: 3, thursday: 4, friday: 5, saturday: 6, sunday: 7

module.exports = mongoose.model('Special', specialSchema)