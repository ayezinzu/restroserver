const mongoose = require('mongoose')
const orderSchema = mongoose.Schema({
    items: [{
        item: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'item',
            required: true
        },
        name: {
            type: String,
            reauired: true
        },
        subcategory: {
            type: String,
            default: null
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        addons: [{
            title: {
                type: String
                // required: true
            },
            value: {
                type: String
                // required: true
            }
        }],
        // description:{
        //     type: String
        // },
    }],
    tableNumber: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        requirede: true
    },

    createdAt: {
        type: Date,
        default: new Date()
    },
    restaurant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    },
    isComplete: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Order', orderSchema)