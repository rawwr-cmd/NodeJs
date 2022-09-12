const { validationResult } = require("express-validator");

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
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: "Validation Failed, entered data is incorrect",
      errors: errors.array(),
    });
  }
  const { title, content } = req.body;
  console.log(title, content);
  // Create post in db
  res.status(201).json({
    message: "Post created successfully!",
    post: {
      _id: new Date().toISOString(),
      title: title,
      content: content,
      creator: {
        name: "Akshay",
      },
      createdAt: new Date(),
    },
  });
};
