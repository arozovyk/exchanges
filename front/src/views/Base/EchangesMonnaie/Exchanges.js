import React, {Component} from 'react';
import {Card, CardBody, CardHeader, Col, Form, Row, Table} from 'reactstrap';

import SubmitOffre from "./SubmitOffre";
import PorteFeuille from "./PorteFeuille";
import OffresExchange from "./OffresExchange";
import TableTauxEchange from "./TableTauxEchange";


class Exchanges extends Component {
  render() {

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="6" md="6">
            <PorteFeuille username={this.props.username} />
          </Col>
          <Col xs="6" md="6">
            <SubmitOffre username={this.props.username} />
          </Col>
        </Row>
        <Row>
          <Col xs="6" md="6">
            <TableTauxEchange />
          </Col>
          <Col xs="6" md="6">
            <OffresExchange username={this.props.username} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Exchanges;
