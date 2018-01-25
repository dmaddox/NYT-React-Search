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
    date: ""
  };

  componentDidMount() {
    this.loadArticles();
  }

  loadArticles = (articles, limit = 10) => {
    console.log(articles);
    // loop through the articles and display the limited number
    // articles.map( article => console.log(article))
      // console.log(articles[i]);
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
      console.log(searchURL);

      // API.saveArticle({
      //   title: this.state.title,
      //   url: this.state.url,
      //   date: this.state.date
      // })
      //   .then(res => this.loadArticles())
      //   .catch(err => console.log(err));

        API.getArticles(`${searchURL}.json`)
          .then(res => this.loadArticles(res.data.response.docs, limit))
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
                {this.state.articles.length ? (
                  <List>
                    {this.state.articles.map(article => (
                      <ListItem key={article._id}>
                        <Link to={"/article/" + article._id}>
                          <strong>
                            {article.title} 
                          </strong>
                        </Link>
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <h3>No Results to Display</h3>
                )}
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
