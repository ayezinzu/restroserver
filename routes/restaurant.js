const router = require('express').Router()
const restaurantController = require('../controller/restaurant')

router.post('/restaurantSignin', restaurantController.singinRestaurant_post)
router.post('/restaurantSignup', restaurantController.singupRestaurant_post)

module.exports = router