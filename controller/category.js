const Category = require('../models/category')
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

exports.getCategory = ((req, res) => {
    Category.find()
        .populate('restaurant')
        .then(result => {
            res.json({ success: true, data: result })
        })
        .catch(error => {
            console.log(error)
            res.json({ success: false, message: 'Category fetch failed' })
        })
})

exports.addCategory = ((req, res) => {
    // upload(req, res, (err) => {
    //     // if (req.file.size > 1024 * 1024) {
    //     //     console.log('error multer')
    //     // }
    //     const url = req.protocol + '://' + req.get("host")
    //     // const newCategory = new Category({
    //     //     name: req.body.name,
    //     //     image: url + '/images/' + req.file.filename
    //     // })
    //     // console.log(newCategory.imagePath, req.file)
    // });
    console.log(req.body)
    let newCategory = new Category({
        name: req.body.name,
        restaurant_id: req.body.restaurant
    });
    newCategory.save()
        .then((addedCategory) => {
            console.log("addedCategory =========+> ", addedCategory)
            res.json({ success: true, message: 'Category Added Successfully', category: addedCategory })
        })
        .catch(error => {
            console.log(error)
            res.json({ success: false, message: 'Category Addition Failed' })
        })

})

exports.updateCategory = ((req, res) => {
    upload(req, res, (err) => {
        let image = req.body.image;
        console.log(req.file, 'file')
        if (req.file) {
            const url = req.protocol + "://" + req.get("host");
            image = url + "/images/" + req.file.filename
            console.log(image, 'test')
            Category.findById({ _id: req.body._id })
                .then(result => {
                    const image = result.image.split("3000")
                    console.log(image[1])
                    fs.unlink(`.${image[1]}`, error => {
                        console.log(error)
                    })
                })
                .catch(error => {
                    return res.json({ success: false, message: 'Image Failure' })
                })
        }
        const updateCategory = {
            name: req.body.name,
            image: image
        }
        console.log(updateCategory)
        Category.findByIdAndUpdate({ _id: req.body.id }, updateCategory)
            .then(() => {
                res.json({ success: true, message: 'Category Updated Successfully' })
            })
            .catch(error => {
                console.log(error)
                res.json({ success: false, message: 'Category Update Failed' })
            })
    })
})

exports.deleteCategory = ((req, res) => {
    Category.findByIdAndDelete({ _id: req.params.id })
        .then(result => {
            const image = result.image.split("3000")
            console.log(image[1])
            fs.unlink(`.${image[1]}`, error => {
                console.log(error)
            })
            res.json({ success: true, message: 'Category Deleted Successfully' })
        })
        .catch(error => {
            console.log(error)
            res.json({ success: false, message: 'Category Deletion Failed' })
        })
})