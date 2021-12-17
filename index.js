const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const { extname } = require("path");

const homeRoutes = require("./routes/home");
const coursesRoutes = require("./routes/courses");
const addRoutes = require("./routes/add");

const app = express();

const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs",
});
app.engine("hbs", hbs.engine); // defind handlebars engine before usage
app.set("view engine", "hbs"); // use handlebars engine
app.set("views", "views"); // here we say handlebars where will store view. by default it is views folder

app.use(express.static("public"));
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use("/", homeRoutes);
app.use("/courses", coursesRoutes);
app.use("/add", addRoutes);

const PORT = process.env.PORT || 3000;
app.listen(3000, () => {
  console.log(`Server is running on port ${PORT}`);
});
