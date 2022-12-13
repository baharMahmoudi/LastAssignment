const mongoose = require("mongoose"),
  booksSchema = mongoose.Schema({
    ID: Number,
    name: String,
    author: String,
    description: String,
    image: String,
    genre: String,
    published: String,
    publisher: String,
  });
module.exports = mongoose.model("books", booksSchema);
