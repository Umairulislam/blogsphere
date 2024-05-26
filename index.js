import express from "express"
import bodyParser from "body-parser"

const app = express()
const port = 3000
let posts = []

// Middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))
app.set("view engine", "ejs")

// Routes
app.get("/", (req, res) => {
  res.render("home", { posts })
})

app.get("/new-post", (req, res) => {
  res.render("new-post")
})

app.post("/new-post", (req, res) => {
  const { title, content } = req.body
  const id = posts.length + 1
  const createdAt = new Date()
  posts.push({ id, title, content, createdAt })
  res.redirect("/")
})

app.get("/post/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id))
  if (post) {
    res.render("post", { post })
  } else {
    res.status(404).send("Post not found")
  }
})

app.get("/edit-post/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id))
  if (post) {
    res.render("edit-post", { post })
  } else {
    res.status(404).send("Post not found")
  }
})

app.post("/edit-post/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id))
  const { title, content } = req.body
  if (post) {
    post.title = title
    post.content = content
    res.redirect(`/post/${post.id}`)
  } else {
    res.status(404).send("Post not found")
  }
})

app.post("/delete-post/:id", (req, res) => {
  const postIndex = posts.findIndex((p) => p.id === parseInt(req.params.id))
  if (postIndex !== -1) {
    posts.splice(postIndex, 1)
    res.redirect("/")
  } else {
    res.status(404).send("Post not found")
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
