var express = require("express");
var path = require ("path");
var bodyParser = require ("body-parser");
var expressValidator = require ("express-validator");

var app = express();

var posts = [
  {id: 1, name: "post1", text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, sint enim soluta quia...", where: "29.10.2014"},
  {id: 2, name: "post2", text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, sint enim soluta quia...", where: "30.10.2014"},
  {id: 3, name: "post3", text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, sint enim soluta quia...", where: "01.11.2014"}
];

var userLogin = [
  {mail: "tpulli@mail.ru", pass: "1111"},
  {mail: "ejiqpa@gmail.com", pass: "qwe"},
  {mail: "ejiqpep@gmail.com", pass: "222"}
];

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(bodyParser());
app.use(expressValidator());

app.post("/log", function(req, res) {
  for(var i = 0; i < userLogin.length; i++){
    if(req.body.username === userLogin[i].mail && req.body.pass === userLogin[i].pass) {
      res.redirect("posts");
    } else {
      res.render("login", {
        h2: "Form Validation Example",
        message: "Sorry, your mail or password is not correct! Please try again!",
      });
    }
      // res.end("Sorry, your mail or password is not correct! Please try again!");
  };

  // If we have only user
  // if(req.body.username === userLogin.mail && req.body.pass === userLogin.pass) {
  //   res.redirect("posts");
  // } else {
  //   res.end("Sorry, your mail or password is not correct! Please try again!");
  // }
});

app.post("/create_post", function(req, res, next) {
  console.log("olololo");

});

app.get("/login", function(req, res) {
  res.render("login");
});

app.get("/posts/new", function(req, res) {
  res.render("new")
});

app.get("/posts", function(req, res) {
  res.render("index", {posts: posts});
});

app.get("/posts/:id", function(req, res) {
  var filteredPost = posts.filter(function (elem){
    return elem.id == req.params.id}).pop();

  res.render("post", {post: filteredPost});
});


app.listen(3001, function() {
  console.log("Start");
});
