const express = require("express");
const postController = require("../controller/post.controller");
const authMiddleware = require("../middleware/auth.middleware");
const authorMiddleware = require("../middleware/author.middleware");
const router = express.Router();

router.get("/get-all", authMiddleware, postController.getAll);
router.post("/create", authMiddleware, postController.create);
router.delete(
  "/delete/:id",
  authMiddleware,
  authorMiddleware,
  postController.delete
);
router.put("/edit/:id", authMiddleware, authorMiddleware, postController.edit);
router.get("/get-one/:id", authMiddleware, postController.getOne);

module.exports = router;
