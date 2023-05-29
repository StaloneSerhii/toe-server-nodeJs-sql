// const Content = require("../models/content");
const path = require("path");
// const fs = require("fs/promises");
// const newsPicture = path.join(__dirname, "../", "public", "newPictures");
const connection = require("../server");

const getByIdContent = (req, res) => {
  const query = "SELECT * FROM content;";
  connection.execute(query, (error, results) => {
    if (error) {
      return res.status(500).json({ error: "Failed to fetch content" });
    }
    res.json(results);
  });
};

module.exports = { getByIdContent };
