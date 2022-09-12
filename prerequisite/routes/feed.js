const express = require("express");
const { body } = require("express-validator");

const { getPosts, createPosts, getSinglePost } = require("../controllers/feed");

const router = express.Router();

// GET /feed/posts
router.get("/posts", getPosts);

// POST /feed/post
router.post(
  "/post",
  [
    body("title").trim().isLength({ min: 7 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  createPosts
);

router.get("/post/:postId", getSinglePost);

module.exports = router;
