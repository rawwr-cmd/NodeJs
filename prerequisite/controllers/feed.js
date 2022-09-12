const { validationResult } = require("express-validator");
const Post = require("../models/post");

exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [
      {
        _id: "1",
        title: "First Post",
        content: "This is the first test post!",
        imageUrl: "images/teddy.jpg",
        creator: {
          name: "Akshay Kumar",
        },
        createdAt: new Date(),
      },
    ],
  });
};

exports.createPosts = (req, res, next) => {
  const errors = validationResult(req);
  // console.log(errors);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect.");
    error.statusCode = 422;
    throw error;
  }
  const { title, content } = req.body;

  console.log(title, content);

  const post = new Post({
    title: title,
    content: content,
    imageUrl: "images/teddy.jpg",
    creator: {
      name: "Akshay",
    },
  });

  post
    .save()
    .then((result) => {
      console.log(result);
      // Create post in db
      res.status(201).json({
        message: "Post created successfully!",
        post: result,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err); //since async
    });
};
