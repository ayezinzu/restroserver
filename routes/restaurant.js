const router = require("express").Router();
const restaurantController = require("../controller/restaurant");
const route = require("./category");

router.post("/restaurantSignin", restaurantController.singinRestaurant_post);
router.post("/restaurantSignup", restaurantController.singupRestaurant_post);
router.post("/colorPost", restaurantController.color_post);
router.post("/colorGet", restaurantController.color_get);
router.get(`/restaurants`, restaurantController.restaurant_get);
router.post('/updatetables', restaurantController.restaurant_tables)
router.post(`/updatepassword`, restaurantController.restaurant_passwordreset)
router.post(`/delete`, restaurantController.restaurant_delete)

module.exports = router;
