var mongoose = require('mongoose');


var BookSchema = new mongoose.Schema({
  isbn: String,
  title: String,
  author: String,
  description: String,
  published_date: { type: Date, default: Date.now },
  genre:String,
  price: Number,
});

module.exports = mongoose.model('Book', BookSchema);
