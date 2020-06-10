import React, {Component} from "react";
import axios from "axios";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  ListGroup,
  Row,
  Tooltip
} from "reactstrap";
import ShowReponse from "./ShowResponse";

class ForumSingle extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.state = {
      messageToSend: '',
      forumMessage: {},
      correspondingResponses: [],
      tooltipOpen: [false, false],
      tooltips: [
        {
          placement: 'top',
          text: 'Top',
        },
        {
          placement: 'bottom',
          text: 'Bottom',
        },
        {
          placement: 'left',
          text: 'Left',
        },
        {
          placement: 'right',
          text: 'Right',
        },
      ],
    };
  }

  toggle(i) {
    const newArray = this.state.tooltipOpen.map((element, index) => {
      return (index === i ? !element : false);
    });
    this.setState({
      tooltipOpen: newArray,
    });
  }


  componentDidMount() {

    console.log("User ID  is " + this.props.match.params.id)
    axios.get(`http://localhost:8080/ServletSample_war_exploded/forum/${this.props.match.params.id}`).then(response => {
      this.setState({forumMessage: response.data})
      console.log(response.data);
    }).catch(function (error) {
      console.log(error);
    });
    axios.get(`http://localhost:8080/ServletSample_war_exploded/forum/${this.props.match.params.id}/responses`).then(response => {
      this.setState({correspondingResponses: response.data})
      console.log(response.data);
    }).catch(function (error) {
      console.log(error);
    });

  }

  submitForm = async e => {
    console.log(this.props.username)
    e.preventDefault();
    axios.post(`http://localhost:8080/ServletSample_war_exploded/forum/${this.props.match.params.id}`,
      {fileId:this.props.match.params.id, userName: this.props.username, messageToSend: this.state.messageToSend})
      .then(response => {
        console.log(response.data);
      }).catch(function (error) {
      console.log(error);
    });

    axios.get(`http://localhost:8080/ServletSample_war_exploded/forum/${this.props.match.params.id}/responses`).then(response => {
      this.setState({correspondingResponses: response.data})
      console.log("co"+ response.data);
      alert("message has been sent")
    }).catch(function (error) {
      console.log(error);
    });

  }

  handleChange = async (event) => {
    const {target} = event;
    await this.setState({
      messageToSend: target.value,
    });
    this.forceUpdate();
  }

  render() {
    const {messageToSend} = this.state;
    return (

      <div className="animated fadeIn">
        <Row>
          <Col lg={6}>
            <Card>
              <CardHeader>

                <i className="fa fa-align-justify"></i><strong>{this.state.forumMessage.username}</strong>
                <small> {this.state.forumMessage.subject}</small>
              </CardHeader>
              <CardBody>
                {/*eslint-disable-next-line*/}
                <p>{this.state.forumMessage.message} <a href="#" id="DisabledAutoHideExample"></a></p>
                <Tooltip placement="right" isOpen={this.state.tooltipOpen[1]} autohide={false}
                         target="DisabledAutoHideExample" toggle={() => {
                  this.toggle(1);
                }}>
                  Try to select this text!
                </Tooltip>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><strong>Réponses</strong>
                <small> </small>
              </CardHeader>
              <CardBody>
                <ListGroup>{this.state.correspondingResponses.map((rsp,index) =>
                  <ShowReponse key={index} id={rsp.response_id} author={rsp.authour} theMessage={rsp.message}/>
                )}</ListGroup>
              </CardBody>
            </Card>
          </Col>
          <Col lg={6}>
            <Card>
              <CardHeader>
                <strong>Poster</strong> une réponse

              </CardHeader>
              <CardBody>
                <Form onSubmit={(e) => this.submitForm(e)} className="form-horizontal">
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
                    <Button type="submit" size="sm" color="primary"><i
                      className="fa fa-dot-circle-o"></i> Submit</Button>

                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

    )
  }
}
export default ForumSingle
