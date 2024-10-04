const express = require("express");
const authController = require("../controller/auth.controller");
const authMiddleware = require("../middleware/auth.middleware")

const router = express.Router();

router.post('/register', authController.register)
router.post('/login', authController.login)
router.post('/logout', authController.logout)
router.post('/refresh', authController.refresh)
router.get('/checkuser', authMiddleware, authController.checkUser)

module.exports = router;
