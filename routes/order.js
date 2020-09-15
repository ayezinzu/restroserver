const route = require('express').Router()
const orderController = require('../controller/order')

route.post('/getOrder', orderController.getOrder_post)
route.post('/addOrder', orderController.addOrder_post)
route.put('/updateOrder', orderController.updateOrder_put)
route.delete('/deleteOrder/:id', orderController.deleteOrder_delete)

module.exports = route