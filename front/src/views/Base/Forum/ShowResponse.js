import React, {Component} from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  Form,
  FormGroup,
  Input,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText
} from "reactstrap";
import axios from "axios";

class ShowReponse extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = {
      messageToSend: '',
      collapse: false,
    };
  }

  submitForm = async e => {
    e.preventDefault();
    axios.put(`http://localhost:8080/ServletSample_war_exploded/forum/${this.props.id}/responses`,
      {id:this.props.id , message : this.state.messageToSend}).then(value => {
      this.forceUpdate()
    })
    alert("message has been modified")
    //TODO put
  }

  handleChange = async (event) => {
    const {target} = event;
    await this.setState({
      messageToSend: target.value,
    });
    this.forceUpdate();

  }
  deleteMessage (id) {
    //delete
    axios.delete(`http://localhost:8080/ServletSample_war_exploded/forum/${id}/responses`, {
      data: {
        id: id
      }
    }).then(value =>  this.forceUpdate());


  }
  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }


  render() {
    const {messageToSend, ...state} = this.state;

    return (

      <ListGroupItem action>
        <ListGroupItemHeading>{this.props.author}</ListGroupItemHeading>
        <ListGroupItemText>
          {this.props.theMessage}
        </ListGroupItemText>
        <Button
          type="reset" size="sm" color="danger"
          onClick={()=>this.deleteMessage(this.props.id)}
        ><i className="fa fa-ban"></i> Supprimer</Button>
        <Card>
          <CardHeader>
            <i>Modifier</i>
          </CardHeader>
          <Collapse isOpen={this.state.collapse}>
            <CardBody>

              <Form onSubmit={(e) => this.submitForm(e)} className="form-horizontal">
                <FormGroup row>
                  <Col lg="9" xs="5" md="5">
                    <Input value= {messageToSend}
                           onChange={(e) => this.handleChange(e)}
                           type="textarea" name="textarea-input" id="textarea-input" rows="9"
                           placeholder="Tapez votre message..."/>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Button type="submit" size="sm" color="success"><i
                    className="fa fa-dot-circle-o"></i> Modifier</Button>
                </FormGroup>
              </Form>

            </CardBody>
          </Collapse>
          <CardFooter>
            <Button onClick={this.toggle} color="primary" className={'mb-1'} id="toggleCollapse1">Ouvrir</Button>
          </CardFooter>
        </Card>
      </ListGroupItem>
    );
  }


}

export default ShowReponse
