const mongoose = require('mongoose')
const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    restaurant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant'
    }
})

module.exports = mongoose.model('category', categorySchema)