const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/content");
const schemasContent = require("../../schemas/schemas");
const { validateBody, upload } = require("../../middlewares");

router.get("/category/list/main", ctrl.getCategory);
router.get("/news/list/", ctrl.getByIdContent);
router.post(
  "/addnews",
  //   validateBody(schemasContent.addNews),
  upload.single("cover"),
  ctrl.postContent
);

module.exports = router;
