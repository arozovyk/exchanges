import React, {Component} from "react";
import {Button, Card, CardBody, CardHeader, Form, Input, Table} from "reactstrap";


class OffresExchange extends Component {

  constructor(props) {
    super(props);
    this.state = {
      offre: "InitOffre",
      achat: "InitAchat",
      taux: 0,
      montantDispo: 0,
      montantToSend: 0,
    };
  }

  componentDidMount() {

  }
  buyOffre = async e => {
    e.preventDefault();
    console.log(`to buy offre: ${this.state.offre}  \n ${this.state.achat} -${this.state.taux} ${this.state.montantDispo} ${this.state.montantToSend}  `)
  }

  handleChangeMontant = async (event) => {
    const {target} = event;
    await this.setState({
      montantToSend: target.value,
    });
    this.forceUpdate();
  }

  render() {
    const {montantToSend} = this.state;
    return (
      <Card>
        <CardHeader>
          Offres d'echange particulier
        </CardHeader>
        <CardBody>
          <Form onSubmit={(e) => this.buyOffre(e)}>
          <Table hover bordered striped responsive size="sm">
            <thead>
            <tr>
              <th>Offre</th>
              <th>Achat</th>
              <th>Taux</th>
              <th>Montant dispo.</th>
              <th></th>
              <th>Action</th>
            </tr>
            </thead>
            <tbody>

            <tr key={0}>
              <td>EUR</td>
              <td>USD</td>
              <td>0.88</td>
              <td>5000</td>
              <td>
                <Input
                  placeholder="Montant" type="number"
                  value={montantToSend}
                  onChange={(e) => this.handleChangeMontant(e)}
                />
              </td>
              <td><Button type="submit" size="sm" color="success">
                <i className="fa fa-dot-circle-o"></i> Acheter</Button></td>
            </tr>
            <tr key={1}>
              <td>EUR</td>
              <td>USD</td>
              <td>0.88</td>
              <td>5000</td>
              <td>
                <Input
                  placeholder="Montant" type="number"
                  value={montantToSend}
                  onChange={(e) => this.handleChangeMontant(e)}
                />
              </td>
              <td>
                <Button onClick={() => this.setState(
                  {
                    buyingCurrency: "EUR",
                    offre: "EUR",
                    achat: "USD",
                    taux: 0.88,
                    montantDispo: 5000,
                  }
                )} type="submit" size="sm" color="success"><i
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

export default OffresExchange
