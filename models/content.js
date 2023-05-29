const { Schema, model } = require("mongoose");
const handleMongooseError = require("../helpers/handleMongooseError");

const news = Schema(
  {
    title: {
      type: String,
      required: [true, "Set title for news"],
    },
    imageURL: { type: String },
    hits: { type: Number, default: 0 },
    text: { type: String },
  },
  { versionKey: false, timestamps: true }
);
news.post("save", handleMongooseError);
news.index({ title: "text" });
const Content = model("new", news);

module.exports = Content;
