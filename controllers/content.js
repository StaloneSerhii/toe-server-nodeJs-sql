const Category = require("../models/category");
const Content = require("../models/content");
const HttpError = require("../helpers");
const { ctrlWrapper } = require("../helpers");
const path = require("path");
const fs = require("fs/promises");
const newsPicture = path.join(__dirname, "../", "public", "newPictures");

const getCategory = async (req, res) => {
  const result = await Category.find();
  res.json(result);
};

const getByIdContent = async (req, res) => {
  const { page = 1, limit = 3, id, findValue } = req.query;
  if (id) {
    const result = await Content.findByIdAndUpdate(id, { $inc: { hits: 1 } });
    if (!result) {
      throw HttpError(404, "Nof Found!");
    }
    return res.json(result);
  } else if (findValue) {
    const result = await Content.find({ $text: { $search: findValue } });
    if (!result) {
      throw HttpError(404, "Nof Found!");
    }
    return res.json(result);
  }
  const skip = (page - 1) * limit;
  const result = await Content.find({}, "", { skip, limit });
  const totalCount = await Content.find({});
  const totalPages = Math.ceil(totalCount.length / 6);
  console.log(totalPages);
  res.json({ res: result, pageAll: totalPages });
};

const postContent = async (req, res) => {
  if (!req.file) {
    res.status(201).json("Create news success");
    return Content.create(req.body);
  }
  const { path: tempUpload, originalname } = req.file;
  const resultUload = path.join(newsPicture, originalname);
  await fs.rename(tempUpload, resultUload);
  const imageURL = path.join("newPictures", originalname);
  const finishURLIMG = `http://localhost:3001/${imageURL}`;
  const content = Content.create({ ...req.body, imageURL: finishURLIMG });
  res.status(201).json("Create news success is img");
};

module.exports = {
  getCategory: ctrlWrapper(getCategory),
  getByIdContent: ctrlWrapper(getByIdContent),
  postContent: ctrlWrapper(postContent),
};
