import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  Row
} from 'reactstrap';
import {withGlobalState} from 'react-globally'
import axios from 'axios'

/*
  function HomeButton() {
    let history = useHistory();

    function handleClick() {
      history.push("/dashboard");
    }

    return (
      <Button onClick={handleClick}color="primary" className="px-4">Login</Button>
    );
  }*/


class Login extends Component {



  handleLoginSubmit = (event) => {

    event.preventDefault();

    console.log()
    axios.post('http://localhost:8080/ServletSample_war_exploded/login',
      {
        username: this.state.username,
        password: this.state.password
    })
      .then(response =>
      {
        if(response.data.resultLogin){
          this.props.setGlobalState(prevGlobalState => ({
            username: this.state.username,
            userId: response.data.foundUser.idUser
          }));
          this.props.history.push(`/users/${response.data.foundUser.idUser}` );
        }else{
          alert("Wrong credentials")

        }
      }
      )


  };

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password:''
    };
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={this.handleLoginSubmit} >
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <FormGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text"
                               name="text"
                               placeholder="Name"
                               value={this.state.username}
                               onChange={e => this.setState({ username: e.target.value })}
                        />
                      </FormGroup>
                      <FormGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="password"
                          name="password"
                          placeholder="Password"
                          value={this.state.password}
                          onChange={e => this.setState({ password: e.target.value })}
                        />
                      </FormGroup>
                      <Row>
                        <Col xs="6">
                          <Button type="submit"  color="primary" className="px-4">Login</Button>
                        </Col>

                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Creez votre nouveau compte</p>
                      <Link to="/register">
                        <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default withGlobalState(Login)
