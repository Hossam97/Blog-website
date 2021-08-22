//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const aboutContent = "Welcome to my blog website. This is a blog where I share my thoughts in the form of blogs";
const contactContent = "Get in touch with me at: hossammohamed.ib@gmail.com";

const app = express();
const postsArr = [];




app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
  res.render("home", {postsArray: postsArr});
})

app.get("/about", function(req, res){
  res.render("about", {aboutPageContent: aboutContent});
})

app.get("/contact", function(req, res){
  res.render("contact", {contactPageContent: contactContent});
})

app.get("/compose", function(req, res){
  res.render("compose");
})

app.get("/posts/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);

  postsArr.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);
    const storedBody = _.lowerCase(post.body);

    if(storedTitle === requestedTitle){
      res.render("post", {
        theTitle: post.title,
        theBody: post.body});
    }

  });


})


app.post("/compose", function(req, res){
  let post = {
    title: req.body.postTitle,
    body: req.body.postBody
  }
  postsArr.push(post);
  res.redirect("/");

})






app.listen(3000, function() {
  console.log("Server started on port 3000");
});
