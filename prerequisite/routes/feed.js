const express = require("express");
const { body } = require("express-validator");

const {
  getPosts,
  createPosts,
  getSinglePost,
  updatePost,
  deletePost,
} = require("../controllers/feed");

const isAuth = require("../middleware/is-auth");

const router = express.Router();

// GET /feed/posts
router.get("/posts", isAuth, getPosts);

// POST /feed/post
router.post(
  "/post",
  isAuth,
  [
    body("title").trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  createPosts
);

router.get("/post/:postId", isAuth, getSinglePost);

router.put(
  "/post/:postId",
  isAuth,
  [
    body("title").trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  updatePost
);

router.delete("/post/:postId", isAuth, deletePost);

module.exports = router;
