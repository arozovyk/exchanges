import React, {Component} from 'react';
import {
  Button, ButtonDropdown,
  Card,
  CardBody,
  CardFooter, CardHeader,
  Col,
  Container, DropdownItem, DropdownMenu, DropdownToggle,
  Form, FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from 'reactstrap';
import axios from "axios";
import {withGlobalState} from 'react-globally'

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username : "",
      pseudo : "",
      password : "",
    };
  }



  handleUsernameChange = async (event) => {
    const {target} = event;
    await this.setState({
      username: target.value,
    });
    this.forceUpdate();
  }
  handlePseudoChange = async (event) => {
    const {target} = event;
    await this.setState({
      pseudo: target.value,
    });
    this.forceUpdate();
  }
  handlePasswordChange = async (event) => {
    const {target} = event;
    await this.setState({
      password: target.value,
    });
    this.forceUpdate();
  }



  submitNewUser = async e => {
    e.preventDefault();
    axios.post(`http://localhost:8080/ServletSample_war_exploded/register`,
      {username: this.state.username, password: this.state.password, pseudo: this.state.pseudo})
      .then(response => {
        //console.log(response.data);

        if(response.data.resultLogin){
          this.props.setGlobalState(prevGlobalState => ({
            username: response.data.foundUser.name,
            userId: response.data.foundUser.idUser
          }));
          this.props.history.push(`/users/${response.data.foundUser.idUser}` );
        }else{
          alert("Not unique user")
        }
      }).catch(function (error) {
      console.log(error);
    });
  }

  render(){
    const {username, pseudo, password} = this.state;
    return(
      <Card>

        <CardBody>
          <Form onSubmit={(e) => this.submitNewUser(e)} action="" method="post" className="form-horizontal">
            <FormGroup row>
              <Col md="6">
                <Card className="mx-4">
                  <CardBody className="p-4">
                      <h1>Register</h1>
                      <p className="text-muted">Create your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          required
                          value={username}
                          onChange={(e) => this.handleUsernameChange(e)}
                          type="text" placeholder="Username" autoComplete="username" />
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>@</InputGroupText>
                        </InputGroupAddon>
                        <Input
                          required
                          value={pseudo}
                          onChange={(e) => this.handlePseudoChange(e)}
                          type="text" placeholder="Pseudo" />
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          required
                          value={password}
                          onChange={(e) => this.handlePasswordChange(e)}
                          type="password" placeholder="Password" autoComplete="new-password" />
                      </InputGroup>
                      <Button type="submit" color="success" block>Create Account</Button>
                  </CardBody>
                </Card>
              </Col>
            </FormGroup>

          </Form>
        </CardBody>
        <CardFooter>
        </CardFooter>
      </Card>

    )
  }


}

export default withGlobalState(Register);
