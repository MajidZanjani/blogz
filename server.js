const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;
let postId = "";
let fileName = "";

app.use(cors());
app.use(bodyParser.json());
app.use(
  "/assets/images",
  express.static(path.join(__dirname, "public/assets/images"))
);

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: "public/assets/images/",
  filename: (req, file, cb) => {
    postId = Date.now().toString();
    const ext = path.extname(file.originalname);
    fileName = `${postId}${ext}`;
    cb(null, fileName); // Save with unique timestamp filename
  },
});

const upload = multer({ storage: storage });

// Load db.json content
const loadData = () => JSON.parse(fs.readFileSync("db.json", "utf8"));

// Get single user by ID
app.get("/api/users/:id", (req, res) => {
  const users = loadData().users;
  const user = users.find((u) => u.id === req.params.id);
  user ? res.json(user) : res.status(404).send("User not found");
});

// Get single user matching props (email OR userName & password)
app.get("/api/users", (req, res) => {
  const { userName, password } = req.query;
  const users = loadData().users;
  const user = users.find(
    (u) => u.userName === userName && u.password === password
  );
  user ? res.json(user) : res.status(404).send("User not found");
});

// Posts route
app.get("/api/posts", (req, res) => {
  const posts = loadData().posts;
  res.json(posts);
});

// Get single post by ID
app.get("/api/posts/:id", (req, res) => {
  const posts = loadData().posts;
  const post = posts.find((p) => p.id === req.params.id);
  post ? res.json(post) : res.status(404).send("Post not found");
});

// Add post route with image upload
app.post("/api/posts", upload.single("posterFile"), (req, res) => {
  const posts = loadData().posts;

  const newPost = {
    id: postId,
    poster: req.file.filename
      ? `./assets/images/${fileName}`
      : `./assets/images/blogpost.png`,
    title: req.body.postTitle,
    content: req.body.postContent,
    authorId: req.body.postAuthorId,
    postDate: new Date().toISOString().split("T")[0],
  };

  posts.push(newPost);

  // Write back to db.json
  fs.writeFileSync(
    "db.json",
    JSON.stringify({ users: loadData().users, posts }, null, 2)
  );

  res.status(201).json(newPost);
});

// Register a new user
app.post("/api/users", (req, res) => {
  const { userName, email, password } = req.body;
  const users = loadData().users;

  const existingUser = users.find(
    (user) => user.email === email || user.userName === userName
  );

  if (existingUser) {
    return res.status(400).json({
      error:
        "User with this email or username already registered. Please choose another username or email.",
    });
  }

  const newUser = {
    id: Date.now().toString(),
    userName,
    email,
    password,
  };

  users.push(newUser);

  fs.writeFileSync(
    "db.json",
    JSON.stringify({ users, posts: loadData().posts }, null, 2)
  );

  res.status(201).json(newUser);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
