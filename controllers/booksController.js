const Book = require("../models/books");

exports.getAllBooks = (req, res, next) => {
  Book.find({}, (error, books) => {
    if (error) next(error);
    req.data = books;
    next();
  });
};

exports.getOneBook = (id, req, res, next) => {
  Book.findOne({ID: id}, (error, books) => {
    if (error) next(error);
    req.data = books;
    next();
  });
};
