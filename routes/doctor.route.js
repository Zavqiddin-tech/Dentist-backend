const express = require("express");
const doctorController = require("../controller/doctor.controller");
const authMiddleware = require("../middleware/auth.middleware");
const authorMiddleware = require("../middleware/author.middleware");
const router = express.Router();

router.get("/get-all", authMiddleware, doctorController.getAll);
router.get("/get-one/:id", authMiddleware, doctorController.getOne);
router.post("/create", authMiddleware, doctorController.create);
router.put("/edit/:id", authMiddleware, doctorController.edit);
router.delete("/delete/:id", authMiddleware, doctorController.delete);

module.exports = router;
