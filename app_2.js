var express = require("express");
var path = require("path");
var locals = require("locals");
var app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(express.static(path.join(__dirname, "public")));

// =============================================================================

  // Arch:

  // /
  // /en

  // /contacts
  // /en/contacts

  // /contacts/new
  // /en/contacts/new

app.use(function(req, res, next){
    var match = req.url.match(/^\/([A-Z]{2})([\/\?].*)?$/i);
    if (match){
        req.lang = match[1];
        req.url = match[2] || '/';
    }

    if(req.lang == undefined) req.lang = "";

    if(req.lang != undefined && req.lang != 'en') {
      console.log('AAA 404');
      // render 404
    }

    console.log('sss1111', req.lang, req.url);

    var jadeVars = {
      locals: locals[req.lang],
      url: req.url,
      lang: req.lang
    };

    if (req.url == '/') {
      console.log(req.lang);
      res.render("pages/index", jadeVars);
    }
    if (req.url == '/contacts') {
      res.render("pages/contacts", jadeVars);
    }
});

// =============================================================================

Вызывается только в том случае если мы все таки используем lang

app.param("lang", function(req, res, next){
  console.log('LALAALALAA');
  if (req.params.lang === undefined) {
    req.params.lang = "ru";
  }
  if (req.params.lang != "ru" && req.params.lang != "en")
    throw new Error("404");
  else {
    res.locals.lang = req.params.lang;
    next();
  }
});


// // Главная
// app.get("/:lang?", function(req, res) {
//   console.log('MMAMAAMAMAMAAMAMAM');
//   var cleanPath;
//   if (typeof(req.params["lang"]) === "undefined") {
//     req.params.lang = "ru";
//     res.locals.lang = req.params.lang;

//     if (req.params.lang == 'en') {
//       console.log('en');
//       cleanPath = req.path.replace('/en', '');
//     }
//     else {
//       console.log('ru');
//       cleanPath = '/en' + req.path;
//     }
//   }
//   res.render("pages/index", {locals: locals[req.params.lang], path: cleanPath});
// });

// // @todo Нужны странички для паблишера, адвертайзера, хернпоймикого

// app.get("/:lang/contacts", function(req, res) {
//   var cleanPath;
//   if (typeof(req.params["lang"]) === "undefined") {
//     req.params.lang = "ru";
//     res.locals.lang = req.params.lang;
//   }
//   if (req.params.lang == 'en') {
//     console.log('en', req.path);
//     cleanPath = req.path.replace('/en', '');
//     console.log('fff', cleanPath);
//   }
//   else {
//     console.log('ru');
//     cleanPath = '/en' + req.path;
//   }
//   res.render("pages/contacts", {locals: locals[req.params.lang], path: cleanPath});
// });

// app.get("/contacts", function(req, res) {
//   var cleanPath;
//   if (typeof(req.params["lang"]) === "undefined") {
//     req.params.lang = "ru";
//     res.locals.lang = req.params.lang;
//   }
//   if (req.params.lang == 'en') {
//     console.log('en', req.path);
//     cleanPath = req.path.replace('/en', '');
//     console.log('fff', cleanPath);
//   }
//   else {
//     console.log('ru');
//     cleanPath = '/en' + req.path;
//   }
//   res.render("pages/contacts", {locals: locals[req.params.lang], path: cleanPath});
// });


app.listen(3000, function() {
  console.log("Start");
});


