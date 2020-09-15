const route = require('express').Router()
const addonsController = require('../controller/addons')

route.get('/getAddons', addonsController.getAddons_get)
route.post('/addAddons', addonsController.addAddons_post)
route.put('/updateAddons', addonsController.updateAddons_put)
route.delete('/deleteAddons/:id', addonsController.deleteAddons_delete)

module.exports = route