const Item = require('../models/item')
const multer = require('multer')
const fs = require('fs')

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
    limits: {
        fileSize: 1000000
    },
    destination: (req, file, cb) => {
        console.log('lol')
        const isValid = MIME_TYPE_MAP[file.mimetype]
        let error = new Error('Invalid Mime Type.')
        if (isValid) {
            error = null
        }
        cb(error, './images')
        console.log(error)
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-')
        console.log(name)
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + '-' + Date.now() + '.' + ext);
    }
})

var upload = multer({ storage: storage }).single('image')

exports.getItem_post = ((req, res) => {
    Item.find({ restaurant_id: req.body.restaurant })
        .populate({ path: 'category', model: 'category' })
        .populate({ path: 'subcategory', model: 'SubCategory' })
        .then(result => {
            console.log(result)
            res.json({ success: true, data: result })
        })
        .catch(error => {
            console.log(error)
            res.json({ success: false, message: 'Item Fetch Failed' })
        })
})

exports.getItemById_get = ((req, res) => {
    Item.findById({ _id: req.params.id })
        .then(result => {
            res.json({ success: true, data: result })
        })
        .catch(error => {
            console.log(error)
            res.json({ success: false, message: 'Item Fetch failed' })
        })
})

exports.getItemSubcategoryWise_post = ((req, res) => {
    Item.find({ subcategory: req.body.id, restaurant_id: req.body.restaurant })
        .populate({ path: 'category', model: 'category' })
        .populate({ path: 'subcategory', model: 'SubCategory' })
        .then(result => {
            console.log(result)
            res.json({ success: true, data: result })
        })
        .catch(error => {
            console.log(error)
            res.json({ success: false, message: 'Item Fetch Failed' })
        })
})

exports.addItem_post = ((req, res) => {
    upload(req, res, (err) => {
        // if (req.file.size > 1024 * 1024) {
        //     console.log('error multer')
        // }
        const url = req.protocol + '://' + req.get("host")
        let imagePath = url + '/images/' + req.file.filename
        let addons = []
        console.log(req.body.addons)
        if (req.body.addons != undefined) {
            if (typeof req.body.addons == 'object' && req.body.addons.length) {
                for (var i = 0; i < req.body.addons.length; i++) {
                    addons.push(JSON.parse(req.body.addons[i]))
                }
            }
            else if (req.body.addons) {
                addons.push(JSON.parse(req.body.addons))
            }
        }
        console.log(addons)
        const newItem = new Item({
            name: req.body.name,
            // category: req.body.category,
            subcategory: req.body.subcategory,
            price: req.body.price,
            description: req.body.description,
            isSpicy: req.body.isSpicy,
            image: imagePath,
            addons: addons,
            restaurant_id: req.body.restaurant
        })
        newItem.save()
            .then((result) => {
                console.log(result)
                res.json({ success: true, data: result })
            })
            .catch(error => {
                console.log(error)
                res.json({ success: false, message: 'Item Addidtion Failed' })
            })
    })
})

exports.updateItem_put = ((req, res) => {
    upload(req, res, (err) => {
        let image = req.body.image;
        console.log(req.file, 'file')
        if (req.file) {
            const url = req.protocol + "://" + req.get("host");
            image = url + "/images/" + req.file.filename
            console.log(image, 'test')
            Item.findById({ _id: req.body.id })
                .then(result => {
                    const image1 = result.image.split("images/")
                    console.log(image1[1])
                    fs.unlink(`./images/${image1[1]}`, error => {
                        console.log(error)
                    })
                })
                .catch(error => {
                    return res.json({ success: false, message: 'Image Failure' })
                })
        }

        let addons = []
        console.log(req.body.addons)
        if (req.body.addons != undefined) {
            if (typeof req.body.addons == 'object' && req.body.addons.length) {
                for (var i = 0; i < req.body.addons.length; i++) {
                    addons.push(JSON.parse(req.body.addons[i]))
                }
            }
            else if (req.body.addons) {
                addons.push(JSON.parse(req.body.addons))
            }
        }
        const updarteItem = {
            name: req.body.name,
            // category: req.body.category,
            subcategory: req.body.subcategory,
            price: req.body.price,
            image: image,
            description: req.body.description,
            isSpicy: req.body.isSpicy,
            addons: addons,
            restaurant_id: req.body.restaurant
        }
        console.log(updarteItem)
        Item.findByIdAndUpdate({ _id: req.body.id }, updarteItem)
            .then(result => {
                res.json({ success: true, message: 'Item Updated Successfully' })
            })
            .catch(error => {
                console.log(error)
                res.json({ success: false, message: 'Item Update Failed' })
            })
    })
})

exports.deleteItem_delete = ((req, res) => {
    Item.findByIdAndDelete({ _id: req.params.id })
        .then(result => {
            console.log(result)
            const image = result.image.split("3000")
            console.log(image[1])
            fs.unlink(`.${image[1]}`, error => {
                console.log(error)
            })
            res.json({ success: true, message: 'Item Deleted Successfully' })
        })
        .catch(error => {
            console.log(error)
            res.json({ success: false, message: ' Item Deletion Failed' })
        })
})