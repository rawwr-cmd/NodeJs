const express = require("express");
const { body } = require("express-validator");

const {
  getPosts,
  createPosts,
  getSinglePost,
  updatePost,
  deletePost,
} = require("../controllers/feed");

const router = express.Router();

// GET /feed/posts
router.get("/posts", getPosts);

// POST /feed/post
router.post(
  "/post",
  [
    body("title").trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  createPosts
);

router.get("/post/:postId", getSinglePost);

router.put(
  "/post/:postId",
  [
    body("title").trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  updatePost
);

router.delete("/post/:postId", deletePost);

module.exports = router;
