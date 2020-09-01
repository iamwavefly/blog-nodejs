const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
require("dotenv").config()
const methodOverride = require("method-override")
const router = require("./routes/Blog")

const app = express()

mongoose.connect(process.env.db_url, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
}, function(err) {
    if (err) {
        console.log(err)
    } else {
        console.log("Connect")
    }
})

// middlewares
app.set("view engine", "ejs")
app.use(express.static(__dirname +"/public"))
app.use(express.urlencoded({extended: false}))
app.use(methodOverride("_method"))
app.get("/", function(req, res) {
    res.render("index", {
        title: "Home Devs Blog"
    })
})

app.use("/blog", router)

app.listen("8080", function() {
    console.log("server started")
})