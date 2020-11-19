const mongoose = require("mongoose");
const restaurantSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  restaurantName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  main: {
    type: String,
    required: false,
  },
  buttons: {
    type: String,
    required: false,
  },
  extra: {
    type: String,
    required: false,
  },
  tables: {
    type: Number,
    required: false,
  },
  logins: {
    type: Number,
    required: false,
  },
});

module.exports = mongoose.model("Reataurant", restaurantSchema);
