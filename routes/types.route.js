const express = require("express");
const typesController = require("../controller/types.controller")
const authMiddleware = require("../middleware/auth.middleware");
const authorMiddleware = require("../middleware/author.middleware");
const router = express.Router();

router.post("/create", authMiddleware, typesController.create);

module.exports = router;
