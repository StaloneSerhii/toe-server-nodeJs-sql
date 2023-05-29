const { Schema, model } = require("mongoose");
const handleMongooseError = require("../helpers/handleMongooseError");

const category = Schema(
  {
    name: {
      type: String,
      required: [true, "Set category name"],
    },
    svgIcon: { type: String },
  },
  { versionKey: false, timestamps: true }
);
category.post("save", handleMongooseError);
const Category = model("category", category);
module.exports = Category;
