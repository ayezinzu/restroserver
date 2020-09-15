const route = require('express').Router()
const itemController = require('../controller/item')

// route.get('/getItem', (req, res) => {
//     Items.find()
//         .then(result => {
//             res.json({ success: true, data: result })
//         })
//         .catch(error => {
//             console.log(error)
//             res.json({ success: false, message: 'Items Fetch Failed' })
//         })
// })

// route.post('/addItem', (req, res) => {
//     const newItem = new Items({
//         name: req.body.name,
//         category: req.body.category,
//         price: req.body.price,
//         image: req.body.image,
//         description: req.body.description,
//         isSpicy: req.body.isSpicy
//     })

//     newItem.save()
//         .then(() => {
//             res.json({ success: true, message: 'Item Added Successfully' })
//         })
//         .catch(error => {
//             console.log(error)
//             res.json({ success: false, message: 'Item Addition Failed' })
//         })
// })

// route.put('/updateItem', (req, res) => {
//     Items.findByIdAndUpdate({ _id: req.body._id }, req.body)
//         .then(() => [
//             res.json({ success: true, message: 'Item Updated Successfully' })
//         ])
//         .catch(error => {
//             res.json({ success: false, message: 'Item Update Failed' })
//         })
// })

// route.delete('/deleteItem/:id', (req, res) => {
//     Items.findByIdAndDelete({ _id: req.params.id })
//         .then(() => {
//             res.json({ success: true, message: 'Item Deleted Successfully' })
//         })
//         .catch(error => {
//             res.json({ success: false, message: 'Item Deletion Failed' })
//         })
// })

route.post('/getItem', itemController.getItem_post)
route.get('/getItemById/:id', itemController.getItemById_get)
route.post('/getItemBySubcategory', itemController.getItemSubcategoryWise_post)
route.post('/addItem', itemController.addItem_post)
route.put('/updateItem', itemController.updateItem_put)
route.delete('/deleteItem/:id', itemController.deleteItem_delete)

module.exports = route