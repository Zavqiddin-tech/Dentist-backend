const express = require("express");
const clientController = require("../controller/client.controller");
const authMiddleware = require("../middleware/auth.middleware");
const authorMiddleware = require("../middleware/author.middleware");
const router = express.Router();


router.get("/get-all", authMiddleware, clientController.getAll);
router.get("/get-one/:id", authMiddleware, clientController.getOne);
router.get("/get-search", authMiddleware, clientController.getSearch);
router.post("/create", authMiddleware, clientController.create);
router.put("/edit/:id", authMiddleware, clientController.edit);
router.delete("/delete/:id", authMiddleware, clientController.delete);

module.exports = router;
