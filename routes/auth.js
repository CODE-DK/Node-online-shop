const { Router } = require("express");
const router = Router();
const User = require("../models/user");

router.get("/login", async (req, res) => {
  res.render("auth/login", {
    title: "Авторизация",
    isLogin: true,
  });
});

router.get("/logout", async (req, res) => {
    req.session.destroy(() => {	
        res.redirect("/auth/login#login")
    }); 
  });

router.post("/login", async (req, res) => {
  const user = await User.findById("61be03f79ebb913e8abf3d05");
  req.session.user = user;
  req.session.isAuthenticated = true;
  req.session.save((err) => {
    if (err) throw err;
    else res.redirect("/");
  });
});

module.exports = router;
