const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const { extname } = require("path");
const Handlebars = require('handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');

const homeRoutes = require("./routes/home");
const coursesRoutes = require("./routes/courses");
const addRoutes = require("./routes/add");
const cardRoutes = require("./routes/card");

const app = express();

const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs",
  handlebars: allowInsecurePrototypeAccess(Handlebars)
});
app.engine("hbs", hbs.engine); // defind handlebars engine before usage
app.set("view engine", "hbs"); // use handlebars engine
app.set("views", "views"); // here we say handlebars where will store view. by default it is views folder

app.use(express.static(path.join(__dirname, "public")));
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use("/", homeRoutes);
app.use("/courses", coursesRoutes);
app.use("/add", addRoutes);
app.use("/card", cardRoutes);

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    console.log("Connection to database...");
    const mongoUrl = "mongodb+srv://mongo:mongo@mern.azpfv.mongodb.net/shop";
    await mongoose.connect(mongoUrl, { useNewUrlParser: true });
    console.log("Connection success!");

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