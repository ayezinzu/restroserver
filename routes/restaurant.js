const router = require('express').Router()
const restaurantController = require('../controller/restaurant')

router.post('/restaurantSignin', restaurantController.singinRestaurant_post)
router.post('/restaurantSignup', restaurantController.singupRestaurant_post)
router.post('/colorPost', restaurantController.color_post)
router.get('/colorGet', restaurantController.color_get)

module.exports = router