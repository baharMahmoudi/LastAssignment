const mongoose = require("mongoose");
const books = require("./models/books");

const booksController = require("./controllers/booksController");
const express = require("express");
const { redirect } = require("express/lib/response");
const app = express();
app.set("view engine", "ejs");

app.set("port", process.env.PORT || 3000);

app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());

require("dotenv").config();
const uri = process.env.ATLAS_URI;

mongoose.connect(uri, { useUnifiedTopology: true });

const db = mongoose.connection;

db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

app.get(
  "/booksList",
  booksController.getAllBooks,
  (req, res, next) => {
    //console.log(req.data);
    res.render("booksList", { books: req.data });
  }
);

app.get(
  "/home",
  booksController.getAllBooks,
  (req, res, next) => {
    res.render("Home", { home: req.data });
  }
);

app.get(
  "/",
  booksController.getAllBooks,
  (req, res, next) => {
    res.render("Home", { home: req.data });
  }
);

app.get(
  "/books/:id",
  (req, res, next) => {
    const result = books.findOne({ID: req.params.id}).exec().then(function(result){
      //console.log(result)
      res.render("Book", { book: result });
    })
  }
);


app.get(
  "/admin",
  booksController.getAllBooks,
  (req, res, next) => {
      //console.log(req.data)
      res.render("admin", { books: req.data });
    }
);

app.get(
  "/edit/:id",
  (req, res, next) => {
    const result = books.findOne({'_id': req.params.id}).exec().then(function(result){
      res.render("editBook", { book: result });
    })
  }
);
app.post(
  "/edit/:id",
  (req, res, next) => {
    books.updateOne({'_id': req.params.id}, {$set: {"name": req.body.name, "author": req.body.author}}).exec().then(function(result){
      res.redirect('/admin');
    })
  }
);

app.post('/admin', async (req, res) => {
  books.deleteOne({'_id': req.body.id}).then(result =>{
    res.redirect("/admin");
  });
})


app.get(
  "/addnewbook",
  (req, res, next) => {
    //console.log(req.data);
    res.render("addnewbook");}
)

app.post('/addnewbook', async (req, res) => {
  const id = req.params.id
  books.create({ name: req.body.nname ,author: req.body.nauthor}).then(result =>{
    res.redirect("/admin");
  });
})


app.use(express.static('public'))

app.get('*', function(req, res){
  res.status(404).render('error404')
});
app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
