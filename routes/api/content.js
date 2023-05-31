const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/category");

router.get("/category/list/", ctrl.getCategory);
router.get("/news/list/", ctrl.getNewsByCategoriId);

module.exports = router;
