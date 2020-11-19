const Restaurant = require("../models/restaurants");

let foundRestros;

exports.restaurant_get = async (req, res) => {
  foundRestros = await Restaurant.find().catch((error) => {
    res.json({ success: false, message: "No Restros found" });
  });
  res.render(`admin`, { foundRestros: foundRestros });
};

exports.restaurant_block = async (req, res) => {
  console.log(`it hit`);
  Restaurant.findOne({ username: req.body.username }).then(async (result) => {
    if (result.blocked) {
      result.blocked = false;
    } else {
      result.blocked = true;
    }
    result
      .save()
      .then(async () => {
        foundRestros = await Restaurant.find().catch((error) => {
          res.json({ success: false, message: "No Restros found" });
        });
        res.render("admin", { foundRestros: foundRestros });
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

exports.singinRestaurant_post = (req, res) => {
  Restaurant.findOne({ username: req.body.username })
    .then((result) => {
      console.log(result);
      if (result.password == req.body.password) {
        if (result.blocked) {
          return res.json({ success: false, message: "Account blocked" });
        }
        result.logins = result.logins + 1;
        if (result.logins > result.tables) {
          return res.json({
            success: false,
            message: "Maximuim logins reached",
          });
        }
        res.json({ success: true, data: result });
      } else {
        res.json({ success: false, message: "Wrong Password" });
      }
    })
    .catch((error) => {
      res.json({ success: false, message: "Wrong Username" });
    });
};

exports.restaurant_tables = (req, res) => {
  Restaurant.findOne({ username: req.body.username })
    .then((result) => {
      console.log(req.body, `result here :D`);
      result.tables = req.body.tables;
      result
        .save()
        .then(async () => {
          foundRestros = await Restaurant.find().catch((error) => {
            res.json({ success: false, message: "No Restros found" });
          });
          console.log(`saved`);
          res.render("admin", { foundRestros: foundRestros });
        })
        .catch((err) => {
          console.log(err, `this err `);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.restaurant_passwordreset = (req, res) => {
  Restaurant.findOne({ username: req.body.username })
    .then((result) => {
      if (req.body.password === req.body.confirmpassword) {
        console.log(result);
        result.password = req.body.password;
        result
          .save()
          .then(async () => {
            foundRestros = await Restaurant.find().catch((error) => {
              res.json({ success: false, message: "No Restros found" });
            });
            res.render("admin", { foundRestros: foundRestros });
          })
          .catch((err) => {
            console.log(err, `this err `);
          });
      } else {
        console.log(err);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.restaurant_delete = async (req, res) => {
  await Restaurant.deleteOne({ username: req.body.username }).catch((err) => {
    console.log(err);
  });

  foundRestros = await Restaurant.find().catch((error) => {
    res.json({ success: false, message: "No Restros found" });
  });
  res.render("admin", { foundRestros: foundRestros });
};

exports.singupRestaurant_post = (req, res) => {
  const newRestaurant = new Restaurant({
    username: req.body.username,
    password: req.body.password,
    restaurantName: req.body.name,
    tables: 3,
    logins: 0,
  });

  newRestaurant
    .save()
    .then((result) => {
      res.json({ success: true, data: result });
    })
    .catch((error) => {
      console.log(error);
      res.json({ success: false, message: "Restaurant Addition Failed" });
    });
};

exports.color_post = async (req, res) => {
  console.log(req.body, `test`);
  const foundRestro = await Restaurant.findById(req.body.restaurant);
  foundRestro.main = req.body.main;
  (foundRestro.buttons = req.body.buttons),
    (foundRestro.extra = req.body.extra);

  foundRestro
    .save()
    .then((result) => {
      res.json({ success: true, data: result });
    })
    .catch((error) => {
      console.log(error);
      res.json({ success: false, message: "Color Addition Failed" });
    });
};

exports.color_get = (req, res) => {
  Restaurant.findById(req.body.restaurant)
    .then((result) => {
      res.json({ success: true, data: result });
    })
    .catch((error) => {
      console.log(error);
      res.json({ success: false, message: "Color Fetch failed" });
    });
};
