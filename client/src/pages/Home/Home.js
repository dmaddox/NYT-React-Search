import React, { Component } from "react";
import { CardWrapper, CardHeader, CardBody } from "../../components/Card";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";

class Home extends Component {
  state = {
    articles: [],
    title: "",
    url: "",
    date: "",
    limit: ""
  };

  componentDidMount() {
    this.loadArticles();
  }

  loadArticles = (articles, limit = 10) => {
    console.log(articles);
    // loop through the articles and display the limited number
    // articles.map( article => console.log(article))
      // console.log(articles[i]);
    this.setState({ articles: articles, limit: limit})
    }

  deleteArticle = id => {
    API.deleteArticle(id)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    // if required fields have values
    if (this.state.search_term && this.state.limit) {
      // build query URL
      const authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";

      // queryURLBase is the start of our API endpoint. The searchTerm will be appended to this when
      // the user hits the search button
      const queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
        authKey + "&q=";

      // Grabbing text the user typed into the search input
      const searchTerm = this.state.search_term;
      const limit = this.state.limit;
      const start_year = this.state.start_year;
      const end_year = this.state.end_year;
      console.log(`${searchTerm}, ${limit}, ${start_year}, ${end_year}`);

      // 
      let searchURL = queryURLBase + searchTerm;
      console.log(searchURL);

      // If the user provides a startYear -- the startYear will be included in the queryURL
      if (parseInt(start_year)) {
        searchURL = `${searchURL}&begin_date=${start_year}0101`;
      }
      

      // If the user provides a startYear -- the endYear will be included in the queryURL
      if (parseInt(end_year)) {
        searchURL = `${searchURL}&end_date=${end_year}0101`;
      }
      //"document_type": "article",
      console.log(searchURL);

      // API.saveArticle({
      //   title: this.state.title,
      //   url: this.state.url,
      //   date: this.state.date
      // })
      //   .then(res => this.loadArticles())
      //   .catch(err => console.log(err));

        API.getArticles(`${searchURL}.json`)
          .then(res => {
            // store response
            const responseArray = res.data.response.docs;
            let articlesArray = [];
            // build an array with the res.data.response.docs
            for (let i = 0; i < responseArray.length; i++ ){
              // if the response is an article
              if (responseArray[i].document_type === "article") {
                console.log(responseArray[i].headline.main);
                console.log(responseArray[i].web_url);
                console.log(responseArray[i].pub_date);
                articlesArray.push(
                  responseArray[i].headline.main
                // {
                //   title: responseArray[i].headline.main,
                //   url: responseArray[i].web_url,
                //   date: responseArray[i].pub_date
                // }
                );
              };
            };

            console.log(articlesArray);

            this.setState({ 
              articles: articlesArray, 
              title: "", 
              author: "", 
              synopsis: "", 
              limit: this.state.limit
            });
            // console.log(res.data);
            // console.log(`${res.data.response.docs[1].headline.main}
            // ${res.data.response.docs[0].web_url}
            // ${res.data.response.docs[0].pub_date}
            // `);
          // this.loadArticles(res.data.response.docs, limit)
          })
          .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-3"></Col>
          <Col size="md-6">
            <CardWrapper>
              <CardHeader>New York Times Search</CardHeader>
              <CardBody>
              <form>
                Search Term:
                <Input
                  value={this.state.search_term}
                  onChange={this.handleInputChange}
                  name="search_term"
                />
                Number of Records:
                <Input
                  value={this.state.limit}
                  onChange={this.handleInputChange}
                  name="limit"
                />
                Start Year (Optional):
                <Input
                  value={this.state.start_year}
                  onChange={this.handleInputChange}
                  name="start_year"
                />End Year (Optional): 
                <Input
                  value={this.state.end_year}
                  onChange={this.handleInputChange}
                  name="end_year"
                />
                <FormBtn
                  disabled={!(this.state.search_term && this.state.limit)}
                  onClick={this.handleFormSubmit}
                >
                  Search
                </FormBtn>
              </form>
              </CardBody>
            </CardWrapper>
          </Col>
          <Col size="md-3"></Col>
        </Row>
        <Row>
          <Col size="md-3"></Col>
          <Col size="md-6">
            <CardWrapper>
              <CardHeader>Results</CardHeader>
              <CardBody>
                <List>
                {this.state.articles}
                </List>
              </CardBody>
            </CardWrapper>
          </Col>
          <Col size="md-3"></Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
