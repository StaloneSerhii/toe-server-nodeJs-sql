const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/content");

router.get("/news/list/", ctrl.getByIdContent);

module.exports = router;
