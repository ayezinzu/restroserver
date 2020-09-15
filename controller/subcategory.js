const Subcategory = require('../models/subcategory')

exports.getsubCategory_post = ((req, res) => {
    Subcategory.find({ category: req.body.category, restaurant_id: req.body.restaurant })
        .populate('category')
        .then(result => {
            res.json({ success: true, data: result })
        })
        .catch(error => {
            res.json({ success: false, message: 'SubCategory Fetch Failed' })
        })
})

exports.addsubCategory_post = ((req, res) => {
    const newsubCategory = new Subcategory({
        name: req.body.name,
        category: req.body.category,
        restaurant_id: req.body.restaurant
    })

    newsubCategory.save()
        .then(result => {
            console.log(result)
            res.json({ success: true, data: result })
        })
        .catch(error => {
            res.json({ success: false, message: 'Sub Category Failed' })
        })
})

exports.updatesubCategory_put = ((req, res) => {
    const updatesubcategory = {
        name: req.body.name,
        category: req.body.category,
        restaurant_id: req.body.restaurant
    }

    Subcategory.findByIdAndUpdate({ _id: req.body.id }, updatesubcategory)
        .then(() => {
            res.json({ success: true, message: 'Sub Category Updated Successfully' })
        })
        .catch(error => {
            res.json({ success: false, message: 'Sub Category Update Failed' })
        })
})

exports.deletesubCategory_delete = ((req, res) => {
    Subcategory.findByIdAndDelete({ _id: req.params.id })
        .then(() => {
            res.json({ success: true, message: 'Sub Cateegory Deleted Successfully ' })
        })
        .catch(error => {
            res.json({ success: false, message: 'Sub Categiory Deletion Failed' })
        })
})