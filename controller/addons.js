const Addons = require('../models/addons')

exports.getAddons_get = ((req, res) => {
    Addons.find()
        .then(result => {
            res.json({ success: true, data: result })
        })
        .catch(error => {
            res.json({ success: false, message: 'Addons Addition failed'})
        })
})

exports.addAddons_post = ((req, res) => {
    const newAddons = new Addons({
        name: req.body.name,
        price: req.body.price
    })

    newAddons.save()
        .then(() =>{
            res.json({ success: true, message: 'Addons Updated Successfully' })
        })
        .catch(error => {
            res.jhson({ success: false, message: 'Addons Update Failed' })
        })
})

exports.updateAddons_put = ((req, res) => {
    const updateAddons = {
        name: req.body.name,
        price: req.body.price
    }

    Addons.findByIdAndUpdate({_id: req.body.id}, updateAddons)
        .then(() => {
            res.json({success: true, message: 'Addons Updated Successfully'})
        })
        .catch(error => {
            res.json({ success: false, message: 'Addons Update Failed'})
        })
})

exports.deleteAddons_delete = ((req, res) => {
    Addons.findByIdAndDelete({_id: req.params.id})
        .then(() => {
            res.json({success: true, message: 'Addons Deleted Successfully'})
        })
        .catch(error => {
            res.json({success: false, message: 'Addosn Deletion Failed'})
        })
})