const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const { extname } = require("path");
const Handlebars = require("handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const User = require("./models/user");

const app = express();

const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs",
  handlebars: allowInsecurePrototypeAccess(Handlebars),
});
app.engine("hbs", hbs.engine); // defind handlebars engine before usage
app.set("view engine", "hbs"); // use handlebars engine
app.set("views", "views"); // here we say handlebars where will store view. by default it is views folder

//Middleware == Filter (ServletFilter)
app.use(async (req, res, next) => {
  try {
    //Mock user
    const user = await User.findById("61be03f79ebb913e8abf3d05");
    req.user = user;
    next();
  } catch (e) {
    console.log(e);
  }
});

app.use(express.static(path.join(__dirname, "public")));
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use("/", require("./routes/home"));
app.use("/courses", require("./routes/courses"));
app.use("/add", require("./routes/add"));
app.use("/card", require("./routes/cart"));
app.use("/orders", require("./routes/orders"));

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    console.log("Connection to database...");
    const mongoUrl = "mongodb+srv://mongo:mongo@mern.azpfv.mongodb.net/shop";
    await mongoose.connect(mongoUrl, { useNewUrlParser: true });
    console.log("Connection success!");

    const candidate = await User.findOne();
    if (!candidate) {
      const user = new User({
        email: "incognito@gmail.com",
        name: "Incognito",
        cart: {
          items: [],
        },
      });

      await user.save();
    }

    console.log("Starting service instance...");
    app.listen(3000, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`http://localhost:${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}

start();
