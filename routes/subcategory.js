const subCategory = require('../controller/subcategory')
const router = require('express').Router()

router.post('/getsubCategory', subCategory.getsubCategory_post)
router.post('/addsubCategory', subCategory.addsubCategory_post)
router.put('/updatesubCategory', subCategory.updatesubCategory_put)
router.delete('/deletesubCategory/:id', subCategory.deletesubCategory_delete)

module.exports = router