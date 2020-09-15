const route = require('express').Router()
const specialController = require('../controller/specials')

route.post('/getSpecials', specialController.getSpecials_post)
route.post('/addSpecials', specialController.addSpecials_post)
route.put('/updateSpecials', specialController.updateSpecials_put)
route.delete('/deleteSpecials/:id', specialController.deleteSpecial_delete)

module.exports = route