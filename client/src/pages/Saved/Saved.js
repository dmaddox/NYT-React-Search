import React, { Component } from "react";
import { CardWrapper, CardHeader, CardBody } from "../../components/Card";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import API from "../../utils/API";
import { List, ListItem } from "../../components/List";
import DeleteBtn from "../../components/DeleteBtn";

class Saved extends Component {
  state = {
    articles: []
  };
  // When this component mounts, retreive all saved articles
  componentDidMount() {
    console.log('component mounted');
    this.loadSaved();
  };

  //
  loadSaved = () => {
    API.getSaved()
      .then(res =>{
        console.log(res.data);
        this.setState({ articles: res.data });
      }
      )
      .catch(err => console.log(err));
      console.log(this.state)
  };

  // when the user deletes
  deleteArticle = id => {
    API.deleteArticle(id)
      .then(res => this.loadSaved())
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-3"></Col>
          <Col size="md-6">
            <CardWrapper>
              <CardHeader>Saved Articles</CardHeader>
              <CardBody>
          
          {this.state.articles.length ? (
            <List>
              {this.state.articles.map(article => (
                <ListItem key={article._id}>
                   <strong><a href={article.url} target="_blank">
                     {article.title}
                     </a>
                   </strong>
                   <br />
                   Published: {article.date}
                   <DeleteBtn onClick={() => this.deleteArticle(article._id)} />
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

export default Saved;
