const express = require("express");
const reportController = require("../controller/report.controller");
const authMiddleware = require("../middleware/auth.middleware");
const authorMiddleware = require("../middleware/author.middleware");
const router = express.Router();

router.get("/get-all", authMiddleware, reportController.getAll);

module.exports = router;
