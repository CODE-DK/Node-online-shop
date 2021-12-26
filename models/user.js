const { Schema, model } = require("mongoose");
const { use } = require("../routes/orders");
const course = require("./course");

const user = Schema({
  email: {
    type: String,
    require: true,
  },
  name: String,
  password: {
    type: String,
    require: true,
  },
  avatarUrl: String,
  cart: {
    items: [
      {
        count: {
          type: Number,
          require: true,
          default: 1,
        },
        courseId: {
          type: Schema.Types.ObjectId,
          ref: "Course",
          require: true,
        },
      },
    ],
  },
});

user.methods.addToCart = function (course) {
  const items = [...this.cart.items];
  const idx = items.findIndex((c) => {
    return c.courseId.toString() === course._id.toString(); //We compare objects as strings
  });

  if (idx > -1) {
    items[idx].count++;
  } else {
    items.push({ courseId: course._id });
  }

  this.cart = { items }; //Equal to {items: items}
  return this.save();
};

user.methods.removeFromCart = function (courseId) {
  let items = [...this.cart.items];
  const idx = items.findIndex((c) => {
    return c.courseId.toString() === courseId.toString();
  });

  if (items[idx].count === 1) {
    items = items.filter((c) => {
      c.courseId.toString() !== courseId.toString();
    });
  } else {
    items[idx].count--;
  }

  this.cart = { items };
  return this.save();
};

user.methods.clearCart = function () {
  this.cart = { items: [] };
  return this.save();
};

module.exports = model("User", user);
