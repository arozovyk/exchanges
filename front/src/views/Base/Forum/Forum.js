import React, {Component} from 'react';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Table
} from 'reactstrap';
import {Link} from "react-router-dom";
import ForumMessages from "./ForumMessage";
import axios from "axios";





class Forum extends Component {
  constructor(props) {
    super(props);
    this.updaterRef=React.createRef();
    this.state = {
      messageToSend: '',
      subjectToSend: 'Biens immobiliers',
      changed: false
    }
  }


  sendNewThreadMessage = async e => {
    e.preventDefault();
    console.log(`Message new file: ${this.state.messageToSend} ${this.state.subjectToSend}`)
    axios.post(`http://localhost:8080/ServletSample_war_exploded/forum`,
      {message:this.state.messageToSend, subject: this.state.subjectToSend, username: this.props.username})
      .then(response => {
        //console.log(response.data);
        this.props.setGlobalState(prevGlobalState => ({
          username: response.data.name,
          userId: response.data.idUser
        }));
        this.forceUpdate()
        this.props.history.push(`/users/${response.data.idUser}` );
      }).catch(function (error) {
      console.log(error);
    });
    this.updaterRef.current.updateThreads();



  }


  updateThreads=()=>{

    this.forceUpdate()
  }

  handleChange = async (event) => {
    const {target} = event;
    await this.setState({
      messageToSend: target.value,
    });
    this.forceUpdate();
  }



  updateSubjectValue= async (event) => {
    this.setState({subjectToSend: event.target.value});
  }

  render() {
    const {messageToSend} = this.state;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Les file de discussion existantes
              </CardHeader>
              <CardBody>
                <Table hover bordered striped responsive size="sm">
                  <thead>
                  <tr>
                    <th>Nom d'utilisateur</th>
                    <th>Message</th>
                    <th>Sujet</th>
                    <th>Date de publication</th>
                    <th></th>
                  </tr>
                  </thead>
                  <ForumMessages ref={this.updaterRef} />
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs="12" md="9">


            <Card>
              <CardHeader>
                Poster Un message
              </CardHeader>
              <CardBody>
                <Form onSubmit={(e) => this.sendNewThreadMessage(e)} action="" method="post" encType="multipart/form-data" className="form-horizontal">
                  <FormGroup row>
                    <Col md="3">
                      <Label>Votre identifiant</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <p className="form-control-static">{this.props.username}</p>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="textarea-input">Message: </Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input value={messageToSend}
                             onChange={(e) => this.handleChange(e)}
                             type="textarea" name="textarea-input" id="textarea-input" rows="9"
                             placeholder="Tapez votre message..."/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="select">Sujet</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input  onChange={this.updateSubjectValue} value={this.state.subjectToSend} type="select" name="select" id="select">
                        <option value="Biens immobiliers"  >Biens immobiliers</option>
                        <option value="Offres"  >Offres</option>
                        <option value="Divers" > Divers</option>
                      </Input>
                    </Col>
                    <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
                  </FormGroup>
                </Form>
              </CardBody>
              <CardFooter>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>

    );
  }
}
export default Forum;
