const { Schema, model } = require("mongoose");
const course = Schema({
  title: {
    type: String,
    require: true
  },
  price: {
    type: Number,
    require: true
  },
  img: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = model("Course", course);
