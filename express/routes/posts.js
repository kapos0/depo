import express from "express";
const router = express.Router();

let posts = [
  { id: 1, title: "Post One", content: "This is post one" },
  { id: 2, title: "Post Two", content: "This is post two" },
  { id: 3, title: "Post Third", content: "This is post Third" },
  { id: 4, title: "Post Four", content: "This is post Four" },
  { id: 5, title: "Post Five", content: "This is post Five" },
  { id: 6, title: "Post Six", content: "This is post Six" },
  { id: 7, title: "Post Seven", content: "This is post Seven" },
  { id: 8, title: "Post Eight", content: "This is post Eight" },
];

router.get("/", (req, res) => {
  //loggerı buralardada çalıştırabilirsin fonksiyonu üçüncü parametre olarak ekleyerek
  const limit = parseInt(req.query.limit);
  if (!isNaN(limit) && limit > 0) res.status(200).json(posts.slice(0, limit));
  else res.status(200).json(posts);
});

router.get("/:id", (req, res, next) => {
  const id = parseInt(req.params.id - 1);
  const post = posts[id];
  if (!post) {
    const error = new Error("Post not found with this id: " + parseInt(id + 1));
    error.status = 404;
    return next(error);
  } else {
    res.status(200).json(post);
  }
});

router.post("/create", (req, res, next) => {
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
    content: req.body.content,
  };
  if (!newPost.title || !newPost.content) {
    const error = new Error("Please include title and content");
    error.status = 400;
    return next(error);
  } else {
    posts.push(newPost);
    res.status(201).json(posts);
  }
});

router.put("/:id", (req, res, next) => {
  const id = parseInt(req.params.id - 1);
  const post = posts[id];
  if (!post) {
    const error = new Error("Post not found with this id: " + parseInt(id + 1));
    error.status = 404;
    return next(error);
  } else {
    post.title = req.body.title;
    post.content = req.body.content;
    res.status(200).json(post);
  }
});

router.delete("/:id", (req, res, next) => {
  const id = parseInt(req.params.id);
  //filter kullandığımız için seçerken -1 yapmamıza gerek yok filter saymaya 0 dan değil 1 den başlar
  const post = posts[id];
  if (!post) {
    const error = new Error("Post not found with this id: " + id);
    error.status = 404;
    return next(error);
  } else {
    posts = posts.filter((post) => post.id !== id);
    res.status(200).json(posts);
  }
});

export default router;
