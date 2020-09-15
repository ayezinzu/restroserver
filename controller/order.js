const Order = require('../models/order')

exports.getOrder_post = ((req, res) => {
    Order.find({ restaurant_id: req.body.restaurant }).sort({ _id: -1 })
        .populate('item')
        .then(result => {
            res.json({ success: true, data: result })
        })
        .catch(error => {
            console.log(error)
            res.json({ success: false, message: 'Order Fetch Failed' })
        })
})

exports.addOrder_post = ((req, res) => {
    console.log(req.body)
    let items = []
    for (var i = 0; i < req.body.items.length; i++) {
        const item = {
            item: req.body.items[i].item,
            name: req.body.items[i].name,
            quantity: req.body.items[i].quantity,
            subcategory: req.body.items[i].subcategory,
            price: req.body.items[i].price,
            addons: req.body.items[i].addons,
            description: req.body.items[i].description
        }
        items.push(item)
    }
    console.log(items)
    const newOrder = new Order({
        items: items,
        tableNumber: req.body.tableNumber,
        total: req.body.total,
        restaurant_id: req.body.restaurant,
        isComplete: false
    })
    newOrder.save()
        .then(() => {
            res.json({ success: true, message: 'Order Created Successfully' })
        })
        .catch(error => {
            console.log(error)
            res.json({ success: false, message: 'Order Creation Failed' })
        })
})

exports.updateOrder_put = ((req, res) => {
    const updateAddons = {
        items: req.body.items,
        user: req.body.user,
        total: req.body.total,
        description: req.body.description,
        restaurant_id: req.body.restaurant,
        isComplete: req.body.isComplete
    }

    Order.findByIdAndUpdate({ _id: req.body.id }, updateAddons)
        .then(() => {
            res.json({ success: true, message: 'Order Updated Successfully' })
        })
        .catch(error => {
            console.log(error)
            res.json({ success: false, message: 'Order Update Failed' })
        })
})

exports.deleteOrder_delete = ((req, res) => {
    Order.findByIdAndDelete({ _id: req.params.id })
        .then(() => {
            res.json({ success: true, messsage: 'Order Deleted Successfully' })
        })
        .catch(error => {
            res.json({ success: false, message: 'Order Delete Failed' })
        })
})