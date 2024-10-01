const express = require("express");
const clientController = require("../controller/client.controller");
const authMiddleware = require("../middleware/auth.middleware");
const authorMiddleware = require("../middleware/author.middleware");
const router = express.Router();

router.post("/create", authMiddleware, clientController.create);

module.exports = router;
