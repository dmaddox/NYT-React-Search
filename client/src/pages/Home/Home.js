import React, { Component } from "react";
import { CardWrapper, CardHeader, CardBody } from "../../components/Card";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";

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

  loadArticles = () => {
    API.getArticles()
      .then(res =>
        this.setState({ articles: res.data, title: "", url: "", date: "" })
      )
      .catch(err => console.log(err));
  };

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
    if (this.state.title && this.state.url) {
      API.saveArticle({
        title: this.state.title,
        url: this.state.url,
        date: this.state.date
      })
        .then(res => this.loadArticles())
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
                Search Term (required):
                <Input
                  value={this.state.title}
                  onChange={this.handleInputChange}
                  name="search_term"
                />
                Number of Records (optional):
                <Input
                  value={this.state.url}
                  onChange={this.handleInputChange}
                  name="limit"
                />
                Start Year (Required):
                <Input
                  value={this.state.date}
                  onChange={this.handleInputChange}
                  name="start_year"
                />End Year (Optional): 
                <Input
                  value={this.state.date}
                  onChange={this.handleInputChange}
                  name="end_year"
                />
                <FormBtn
                  disabled={!(this.state.author && this.state.title)}
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
