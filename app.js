const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const expressLayouts = require("express-ejs-layouts");
const categoryRoute = require("./routes/category");
const path = require("path");
const itemRoute = require("./routes/item");
const orderRoute = require("./routes/order");
const subCategoryRoute = require("./routes/subcategory");
const addonsRoute = require("./routes/addons");
const specialsRoute = require("./routes/specials");
const notificationRoute = require("./routes/notification");
const restaurantRouter = require("./routes/restaurant");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/images", express.static(path.join("./images")));
app.use("/css", express.static(__dirname + "/public/css"));
app.use("/js", express.static(__dirname + "/public/js"));
app.set(`view engine`, `ejs`);
app.use(expressLayouts);
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

mongoose
  .connect(
    "mongodb+srv://Restro:Restro1234@cluster0.mvckn.mongodb.net/Restro?retryWrites=true&w=majority",
    { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
  )
  // mongoose.connect('mongodb://localhost:27017/restaurant', { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    console.log("Mongodb Connected Successfully");
  })
  .catch((error) => {
    console.log(error);
    console.log("Mongodb Connection Failed");
  });

app.use("/category", categoryRoute);
app.use("/subcategory", subCategoryRoute);
app.use("/addons", addonsRoute);
app.use("/item", itemRoute);
app.use("/specials", specialsRoute);
app.use("/order", orderRoute);
app.use("/notification", notificationRoute);
app.use("/restaurant", restaurantRouter);

app.get(`/`, (req, res) => {
  res.render("admin", { restname: `swamishreeji` });
});

const port = process.env.PORT || 3777;

app.get("/hello", (req, res) => {
  res.send("Hello ", port);
});

app.listen(port, () => {
  console.log(`Magic Happens At Port ${port}`);
});
