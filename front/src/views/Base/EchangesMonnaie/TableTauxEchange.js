import {
  Button,
  ButtonDropdown, Card,
  CardBody,
  CardHeader,
  DropdownItem,
  DropdownMenu,
  DropdownToggle, Form,
  Input, Table
} from "reactstrap";
import React, {Component} from "react";
import axios from "axios";


class TableTauxEchange extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.changeValue = this.changeValue.bind(this);
    this.state = {
      montantToSend: 0,
      currencies: {},
      deviseReference: 'USD',
      buyingCurrency: 'USD',
      dropdownOpen: false,
    };
  }


  toggle(event) {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  changeValue(e) {
    this.setState({deviseReference: e.currentTarget.textContent})
  }

  buyCentralBank = async e => {
    e.preventDefault();
    console.log(`to buy fro cb: ${this.state.deviseReference}  ${this.state.montantToSend} -${this.state.buyingCurrency}  `)
  }
  componentDidMount() {
    axios.get(`http://localhost:8080/ServletSample_war_exploded/rates/USD`).then(value =>{
        this.setState({currencies:value.data});
        console.log(value.data.EUR);
    }

    )


  }
  handleChangeMontant = async (event) => {
    const {target} = event;
    await this.setState({
      montantToSend: target.value,
    });
    this.forceUpdate();
  }
  refreshRate = async (event) =>{
    console.log("Methods refreshed for "+this.state.deviseReference)
    axios.get(`http://localhost:8080/ServletSample_war_exploded/rates/${this.state.deviseReference}`).then(value =>{
      this.setState({currencies:value.data});
      console.log(value.data.EUR);
    })
  }

  render() {
    const {montantToSend} = this.state;

    return (
      <Card>
        <CardHeader>
          Echanges | Banque centrale |
        </CardHeader>
        <CardBody>
          <Form onSubmit={(e) => this.buyCentralBank(e)}>
            <Table hover bordered striped responsive size="sm">
              <thead>
              <tr>
                <th>Devise</th>
                <th>Taux</th>
                <th></th>
                <th>Action</th>
              </tr>
              </thead>

              <tbody>
              <tr key={65}>
                <td>
                  <ButtonDropdown size="sm" className="mr-" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle block outline caret color="dark">
                      {this.state.deviseReference}
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem>
                        <div onClick={this.changeValue}>USD</div>
                      </DropdownItem>
                      <DropdownItem>
                        <div onClick={this.changeValue}>EUR</div>
                      </DropdownItem>
                      <DropdownItem>
                        <div onClick={this.changeValue}>JPY</div>
                      </DropdownItem>
                      <DropdownItem>
                        <div onClick={this.changeValue}>RUB</div>
                      </DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>
                </td>
                <td>1</td>
                <td>Changer la défise</td>
                <td>
                  <Button onClick={this.refreshRate}  size="sm" color="dark"><i className="fa fa-dot-circle-o"></i>Changer</Button>
                </td>
              </tr>



              <tr key={11}>
                <td>
                  EUR
                </td>
                <td>{this.state.currencies.EUR}</td>
                <td>
                  <Input
                    placeholder="Montant" type="number"
                    value={montantToSend}
                    onChange={(e) => this.handleChangeMontant(e)}
                  />
                </td>
                <td>
                  <Button onClick={() => this.setState({buyingCurrency: "EUR",})} type="submit" size="sm" color="success"><i
                    className="fa fa-dot-circle-o"></i>
                    Acheter
                  </Button>
                </td>
              </tr>

              <tr key={12}>
                <td>
                  RUB
                </td>
                <td>{this.state.currencies.RUB}</td>
                <td>
                  <Input
                    placeholder="Montant" type="number"
                    value={montantToSend}
                    onChange={(e) => this.handleChangeMontant(e)}
                  />
                </td>
                <td>
                  <Button onClick={() => this.setState({buyingCurrency: "RUB"})}
                          type="submit" size="sm" color="success"><i
                    className="fa fa-dot-circle-o"></i>
                    Acheter
                  </Button>
                </td>
              </tr>

              <tr key={13}>
                <td>
                  GBP
                </td>
                <td>{this.state.currencies.GBP}</td>
                <td>
                  <Input
                    placeholder="Montant" type="number"
                    value={montantToSend}
                    onChange={(e) => this.handleChangeMontant(e)}
                  />
                </td>
                <td>
                  <Button onClick={() => this.setState({buyingCurrency: "GBP"})}
                          type="submit" size="sm" color="success"><i
                    className="fa fa-dot-circle-o"></i>
                    Acheter
                  </Button>
                </td>
              </tr>
              </tbody>
            </Table>
          </Form>
        </CardBody>
      </Card>


    )
  }



}


export default TableTauxEchange
