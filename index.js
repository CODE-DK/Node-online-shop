const express = require("express");
const path = require("path");
const csrf = require("csurf");
const flash = require("connect-flash");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const session = require("express-session");
const MongoStore = require("connect-mongodb-session")(session);
const Handlebars = require("handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");

//Property
const SERVER_PORT = 3000;
const SESSION_SECRET = "some secret value";
const MONGODB_URI = "mongodb+srv://mongo:mongo@mern.azpfv.mongodb.net/shop";

//App config
const app = express();
const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs",
  handlebars: allowInsecurePrototypeAccess(Handlebars),
});
app.engine("hbs", hbs.engine); // defind handlebars engine before usage
app.set("view engine", "hbs"); // use handlebars engine
app.set("views", "views"); // here we say handlebars where will store view. by default it is views folder
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

//Session config
const mongoStore = new MongoStore({
  collection: "sessions",
  uri: MONGODB_URI,
});
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: mongoStore,
  })
);

//Middleware config
app.use(csrf());
app.use(flash());
app.use(require("./middleware/variables"));
app.use(require("./middleware/user"));

//Routes config
app.use("/", require("./routes/home"));
app.use("/courses", require("./routes/courses"));
app.use("/add", require("./routes/add"));
app.use("/card", require("./routes/cart"));
app.use("/orders", require("./routes/orders"));
app.use("/auth", require("./routes/auth"));

//App Starter
async function start() {
  try {
    console.log("Connection to database...");
    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
    console.log("Connection success!");

    app.listen(SERVER_PORT, () => {
      console.log(`Server is running on port ${SERVER_PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}

start();
