import {
  Button,
  ButtonDropdown,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "reactstrap";
import React, {Component} from "react";


class SubmitOffre extends Component{
  constructor(props) {
    super(props);
    this.toggle1 = this.toggle1.bind(this);
    this.toggle2 = this.toggle2.bind(this);
    this.changeValue1 = this.changeValue1.bind(this);
    this.changeValue2 = this.changeValue2.bind(this);
    this.state = {
      montantToSend: 0,
      tauxToSend:0.0,
      actions: [],
      dropDownValue1: 'Offrir',
      dropDownValue2: 'Acheter',
      dropdownOpen1: false,
      dropdownOpen2: false
    };
  }
  toggle1(event) {
    this.setState({
      dropdownOpen1: !this.state.dropdownOpen1
    });
    this.forceUpdate()
  }
  toggle2(event) {
    this.setState({
      dropdownOpen2: !this.state.dropdownOpen2
    });
    this.forceUpdate()
  }
  changeValue1(e) {
    this.setState({dropDownValue1: e.currentTarget.textContent})
  }

  changeValue2(e) {
    this.setState({dropDownValue2: e.currentTarget.textContent})
  }
  handleChangeMontant = async (event) => {
    const {target} = event;
    await this.setState({
      montantToSend: target.value,
    });
    this.forceUpdate();
  }
  handleChangeTaux = async (event) => {
    const {target} = event;
    await this.setState({
      tauxToSend: target.value,
    });
    this.forceUpdate();
  }

  submitOffre = async e => {
    e.preventDefault();
    console.log(`to send offre : ${this.state.dropDownValue1} - ${this.state.dropDownValue2} - ${this.state.montantToSend} - ${this.state.tauxToSend} - `)
  }



  render(){
    const {montantToSend, tauxToSend, ...state} = this.state;
    return(
      <Card>
        <CardHeader>
          Soumettre une offre
        </CardHeader>
        <CardBody>
          <Form onSubmit={(e) => this.submitOffre(e)} action="" method="post" className="form-horizontal">
            <FormGroup row>
              <Col md="6">
                <ButtonDropdown size="sm" className="mr-1" isOpen={this.state.dropdownOpen1} toggle={ this.toggle1}>
                  <DropdownToggle caret color="danger">
                    {this.state.dropDownValue1}
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem><div onClick={this.changeValue1}>USD</div></DropdownItem>
                    <DropdownItem><div onClick={this.changeValue1}>EUR</div></DropdownItem>
                    <DropdownItem><div onClick={this.changeValue1}>JPY</div></DropdownItem>
                    <DropdownItem><div onClick={this.changeValue1}>RUB</div></DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
                <ButtonDropdown  size="sm" className="mr-1" isOpen={this.state.dropdownOpen2} toggle={ this.toggle2}>
                  <DropdownToggle caret color="info">
                    {this.state.dropDownValue2}

                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem><div onClick={this.changeValue2}>USD</div></DropdownItem>
                    <DropdownItem><div onClick={this.changeValue2}>EUR</div></DropdownItem>
                    <DropdownItem><div onClick={this.changeValue2}>JPY</div></DropdownItem>
                    <DropdownItem><div onClick={this.changeValue2}>RUB</div></DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>

              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="12">
                <InputGroup>
                  <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                  <Input
                    placeholder="Montant" type="number"
                    value={montantToSend}
                    onChange={(e) => this.handleChangeMontant(e)}
                  />
                  <Input
                    placeholder="Taux" type="number" step="1"
                    value={tauxToSend}
                    onChange={(e) => this.handleChangeTaux(e)}

                  />
                  <InputGroupAddon addonType="append">.00</InputGroupAddon>
                  <InputGroupAddon addonType="append">
                    <InputGroupText>
                      <i className="fa fa-envelope-o"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="12">
                <Button type="submit" size="sm" color="success"><i className="fa fa-dot-circle-o"></i> Submit</Button>
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

export default SubmitOffre
