const route = require('express').Router()
const notificationController = require('../controller/notification')

route.post('/getNotification', notificationController.getNotification_post)
route.post('/addNotification', notificationController.addNotification_post)
route.put('/updateNotification', notificationController.updateNotification_put)
route.delete('/deleteNotification/:id', notificationController.deleteNotification_delete)

module.exports = route