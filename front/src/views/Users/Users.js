import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Badge, Card, CardBody, CardHeader, Col, Row, Table} from 'reactstrap';

import usersData from './UsersData'
import axios from "axios";

function UserRow(props) {
  const user = props.user
  const userLink = `/users/${user.idUser}`



  return (
    <tr key={user.id}>
      <th scope="row"><Link to={userLink}>{user.idUser}</Link></th>
      <td><Link to={userLink}>{user.name}</Link></td>
      <td><Link to={userLink}>{user.pseudo}</Link></td>
    </tr>
  )
}

class Users extends Component {

  constructor(props) {
    super(props);


    this.state = {
      userList: []
    }
  }
    componentDidMount(){
      axios.get('http://localhost:8080/ServletSample_war_exploded/users', ).then(response => {
        console.log(response.data);
        this.setState({userList : response.data})
      });
    }

    render() {



    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={6}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Users <small className="text-muted">example</small>
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">id</th>
                      <th scope="col">name</th>
                      <th scope="col">pseudo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.userList.map((user, index) =>
                      <UserRow key={index} user={user}/>
                    )}
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

export default Users;
