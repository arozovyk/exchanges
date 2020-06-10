import React, {Component} from 'react';
import {Card, CardBody, CardHeader, Col, Row, Table} from 'reactstrap';

import usersData from './UsersData'
import axios from "axios";

class User extends Component {
  constructor(props) {
    super(props);


    this.state = {
      user : {}
    }

  }

  componentDidMount(){
    axios.get(`http://localhost:8080/ServletSample_war_exploded/users/${this.props.match.params.id}`,
      ).then(response => {
      console.log(response.data);
      this.setState({user : response.data})
    });
  }
  render() {



    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={6}>
            <Card>
              <CardHeader>
                <strong><i className="icon-info pr-1"></i>User id: {this.props.match.params.id}</strong>
              </CardHeader>
              <CardBody>
                  <Table striped hover>
                    <tbody>
                            <tr key={this.state.user.idUser}>
                              <td>Id : {this.state.user.idUser}</td>
                              <td>Nom : <strong>{this.state.user.name}</strong></td>
                              <td>Pseudo : <strong>{this.state.user.pseudo}</strong></td>
                            </tr>
                    </tbody>
                  </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default User;
