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
  const { title, content } = req.body;
  console.log(title, content);
  // Create post in db
  res.status(201).json({
    message: "Post created successfully!",
    post: {
      id: new Date().toISOString(),
      title: title,
      content: content,
      creator: {
        name: "Akshay",
      },
      createdAt: new Date(),
    },
  });
};
