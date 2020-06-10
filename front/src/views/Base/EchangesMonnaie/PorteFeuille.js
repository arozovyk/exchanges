import React, {Component} from "react";
import {Card, CardBody, CardHeader, Table} from "reactstrap";
import axios from "axios";

export function PorteFeuilleRow(props) {
  console.log(props.lala)
  return (
    <tr key={props.lala}>
      <td>{props.monnaie.currency}</td>
      <td>{props.monnaie.montant}</td>
    </tr>

  )
}

class PorteFeuille extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currencies: []
    }
  }

  componentDidMount() {

    axios.get(`http://localhost:8080/ServletSample_war_exploded/exchanges/${this.props.username}`).then(result =>
      {
        this.setState({currencies: result.data})
        console.log(result.data)
      }
    )
  }

  render() {
    return (
      <Card>
        <CardHeader>
          Portefeuille
        </CardHeader>
        <CardBody>
          <Table hover bordered striped responsive size="sm">
            <thead>
            <tr key={-1}>
              <th>Devise</th>
              <th>Montant</th>
            </tr>
            </thead>
            <tbody>
            {this.state.currencies.map((monnaie, unique) =>

              <PorteFeuilleRow lala={unique}  monnaie={monnaie} />

            )}

            </tbody>
          </Table>
        </CardBody>
      </Card>
    )
  }
}


export default PorteFeuille
