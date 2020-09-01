const express = require("express")
const blogSchema = require("../models/BlogSchema")

const router = express.Router()

router.get("/", async function(req, res) {
    const articles = await blogSchema.find().sort({date: "desc"})
    res.render("blog", {
        title: "Blogs made by Devs",
        articles: articles
    })
})
router.get("/new", function(req, res) {
    res.render("new", {
        title: "Create new post"
    })
})
router.get("/:id", async function(req, res) {
    try {
        const articles = await blogSchema.findById(req.params.id)
        console.log(req.params.id)
        res.render("post", {
            articles: articles,
            title: articles.title
        })
    } catch (error) {
        console.log(error)
    }
    
})
router.delete("/:id", async function(req, res) {
    await blogSchema.findByIdAndDelete(req.params.id)
    res.redirect("/blog")
})
router.post("/", async function(req, res) {
    let newArticle = new blogSchema({
        title: req.body.title,
        content: req.body.content,
        category: req.body.category
    })

    try {
        const article = await newArticle.save()
        res.redirect(`/blog/${article.id}`)
        
    } catch (error) {
        console.log(error)
    }
})

module.exports = router