const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articlesSchema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  date: { type: Date, required: true }
});

const Articles = mongoose.model("Book", articlesSchema);

module.exports = Articles;
