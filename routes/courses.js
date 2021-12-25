const { Router } = require("express");
const Course = require("../models/course");
const router = Router();
const auth = require("../middleware/auth");
const { courseValidator } = require("../utils/validatiors");
const { validationResult } = require("express-validator");

router.get("/", async (req, res) => {
  const courses = await Course.find();
  res.render("courses", {
    title: "Курсы",
    isCourses: true,
    courses,
  });
});

router.post("/edit", auth, courseValidator, async (req, res) => {
  const errors = validationResult(req);
  const { id } = req.body;

  if (!errors.isEmpty()) {
    res.status(422).redirect(`/courses/${id}/edit?allow=true`)
  }
  
  try { 
    delete req.body.id;
    await Course.findByIdAndUpdate(id, req.body);
    return res.redirect("/courses"); 
  } catch(e) { 
    console.log(e);
  }
});

router.get("/:id/edit", auth, async (req, res) => {
  if (!req.query.allow) {
    return res.redirect("/");
  }

  const course = await Course.findById(req.params.id);

  res.render("course-edit", {
    title: `Редактировать ${course.title}`,
    course,
  });
});

router.get("/:id", async (req, res) => {
  const course = await Course.findById(req.params.id);
  res.render("course", {
    title: `Курс ${course.title}`,
    course,
  });
});

router.post("/remove", auth, async (req, res) => {
  try {
    await Course.deleteOne({ _id: req.body.id });
    res.redirect("/courses");
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
