const express = require("express");
const doctorController = require("../controller/doctor.controller");
const authMiddleware = require("../middleware/auth.middleware");
const authorMiddleware = require("../middleware/author.middleware");
const router = express.Router();

router.post("/create", authMiddleware, doctorController.create);

module.exports = router;
