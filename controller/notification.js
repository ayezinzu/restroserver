const Notification = require('../models/notification')

exports.getNotification_post = ((req, res) => {
    Notification.find({ restaurant_id: req.body.restaurant })
        .then(result => {
            res.json({ success: true, data: result })
        })
        .catch(error => {
            console.log(error)
            res.json({ success: false, message: 'Notification fetch Failed' })
        })
})

exports.addNotification_post = ((req, res) => {
    const newNotification = new Notification({
        title: req.body.title,
        description: req.body.description,
        restaurant_id: req.body.restaurant
    })

    newNotification.save()
        .then(() => {
            res.json({ success: true, message: 'Notiication Inssert Successfully' })
        })
        .catch(error => {
            console.log(error)
            res.json({ success: false, message: 'Notification Insert Failed' })
        })
})

exports.updateNotification_put = ((req, res) => {
    const updateNotification = {
        title: req.body.title,
        description: req.body.description,
        restaurant_id: req.body.restaurant
    }

    Notification.findByIdAndUpdate({ _id: req.body.id }, updateNotification)
        .then(() => {
            res.json({ success: true, message: 'Notification Updated Successfully' })
        })
        .catch(error => {
            res.json({ success: false, message: 'Notification Update Failed' })
        })
})

exports.deleteNotification_delete = ((req, res) => {
    Notification.findOneAndDelete({ _id: req.params.id })
        .then(() => {
            res.json({ success: true, message: 'Notification Deleted Successfully' })
        })
        .catch(error => {
            res.json({ success: false, message: 'Notification Deletion Failed' })
        })
})