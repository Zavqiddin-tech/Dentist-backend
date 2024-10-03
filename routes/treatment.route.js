const express = require("express");
const treatmentController = require("../controller/treatment.controller");
const authMiddleware = require("../middleware/auth.middleware");
const authorMiddleware = require("../middleware/author.middleware");
const router = express.Router();

router.post("/create", authMiddleware, treatmentController.create);
router.post("/addPay/:id", authMiddleware, treatmentController.addPay);

module.exports = router;
