const { Router } = require("express");
const router = Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

router.get("/login", async (req, res) => {
  res.render("auth/login", {
    title: "Авторизация",
    isLogin: true,
    error: req.flash("error"),
  });
});

router.get("/logout", async (req, res) => {
  req.session.destroy(() => {
    res.redirect("/auth/login#login");
  });
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const candidate = await User.findOne({ email });
    if (candidate) {
      const areSame = await bcrypt.compare(password, candidate.password);
      if (areSame) {
        req.session.user = candidate;
        req.session.isAuthenticated = true;
        req.session.save((err) => {
          if (err) throw err;
          else res.redirect("/");
        });
      } else {
        req.flash("error", "Не верный пользователь или пароль.");
        res.redirect("/auth/login#login");
      }
    } else {
      req.flash("error", "Не верный пользователь или пароль.");
      res.redirect("/auth/login#login");
    }
  } catch (e) {
    console.log(e);
  }
});

router.post("/register", async (req, res) => {
  try {
    const { email, name, password, confirm } = req.body;
    const candidate = await User.findOne({ email });
    if (candidate) {
      req.flash("error", "Такой email уже занят.");
      res.redirect("/auth/login#register");
    } else {
      const hashPassword = await bcrypt.hash(password, 10);
      const user = new User({
        email,
        name,
        password: hashPassword,
        cart: { items: [] },
      });
      await user.save();
      res.redirect("/auth/login#login");
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
