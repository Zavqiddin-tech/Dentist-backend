const express = require("express");
const treatmentController = require("../controller/treatment.controller");
const authMiddleware = require("../middleware/auth.middleware");
const authorMiddleware = require("../middleware/author.middleware");
const router = express.Router();

router.get("/get-all", authMiddleware, treatmentController.getAll);
router.post("/get-filter", authMiddleware, treatmentController.getFiltered);
router.post("/create", authMiddleware, treatmentController.create);
router.get("/get-one/:id", authMiddleware, treatmentController.getOne);
router.post(
  "/monitoring/create/:id",
  authMiddleware,
  treatmentController.addPay
);

module.exports = router;
