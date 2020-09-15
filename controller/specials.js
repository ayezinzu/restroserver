const Specials = require('../models/specials')
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

exports.getSpecials_post = ((req, res) => {
    Specials.find({ restaurant_id: req.body.restaurant })
        .populate('category')
        .populate({ path: 'subcategory', model: 'SubCategory' })
        .then(result => {
            res.json({ success: true, data: result })
        })
        .catch(error => {
            res.json({ success: false, message: 'Specials fetch Failed' })
        })
})

exports.addSpecials_post = ((req, res) => {
    upload(req, res, (err) => {
        // if (req.file.size > 1024 * 1024) {
        //     console.log('error multer')
        // }
        const url = req.protocol + '://' + req.get("host")
        let imagePath = url + '/images/' + req.file.filename
        const newSpecial = new Specials({
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
            subcategory: req.body.subcategory,
            description: req.body.description,
            isSpicy: req.body.isSpicy,
            image: imagePath,
            day: req.body.day,
            restaurant_id: req.body.restaurant
        })
        newSpecial.save()
            .then(() => {
                res.json({ success: true, message: 'Special Added Successfully' })
            })
            .catch(error => {
                console.log(error)
                res.json({ success: false, message: 'Special Added Failed' })
            })
    })
})

exports.updateSpecials_put = ((req, res) => {
    upload(req, res, (err) => {
        let image = req.body.image;
        console.log(req.file, 'file')
        if (req.file) {
            const url = req.protocol + "://" + req.get("host");
            image = url + "/images/" + req.file.filename
            console.log(image, 'test')
            Specials.findById({ _id: req.body._id })
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
        const updateSpecial = {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
            subcategory: req.body.subcategory,
            description: req.body.description,
            isSpicy: req.body.isSpicy,
            image: image,
            day: req.body.day,
            restaurant_id: req.body.restaurant
        }
        console.log(updateSpecial)
        Specials.findByIdAndUpdate({ _id: req.body.id }, updateSpecial)
            .then(() => {
                res.json({ success: true, message: 'Special Updated Successfully' })
            })
            .catch(error => {
                console.log(error)
                res.json({ success: false, message: 'Specila Update Failed' })
            })
    })
})

exports.deleteSpecial_delete = ((req, res) => {
    Specials.findByIdAndDelete({ _id: req.params.id })
        .then(result => {
            console.log(result)
            if (result.image) {
                const image = result.image.split("3000")
                console.log(image[1])
                fs.unlink(`.${image[1]}`, error => {
                    console.log(error)
                })
            }
            res.json({ success: true, message: 'Special Deleted Successfully' })
        })
        .catch(error => {
            console.log(error)
            res.json({ success: false, message: 'Special Deletion Failed' })
        })
})