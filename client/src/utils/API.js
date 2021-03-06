import axios from "axios";

export default {
  // Gets all articles
  getArticles: function(queryURL) {
  //queries NYT
    return axios.get(queryURL);
  },
  getSaved: function() {
    return axios.get("/api/articles");
  },
  // Saves an article with the given id
  // getArticle: function(id) {
  //   return axios.get("/api/articles/" + id);
  // },
  // Deletes the article with the given id
  deleteArticle: function(id) {
    return axios.delete("/api/articles/" + id);
  },
  // Saves a article to the database
  saveArticle: function(articleData) {
    console.log("running API.saveArticle function");
    return axios.post("/api/articles", articleData);
  }
};

