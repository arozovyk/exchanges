import React, {Component} from 'react';

import {
  Badge,
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
} from 'reactstrap';
import axios from "axios";

import ShowReponse from "./ShowResponse";
import {Link} from "react-router-dom";



export function MessageRow(props) {
  const message = props.fm
  const userLink = `/forum/${message.forum_message_id}`



  return (
    <tr key={message.forum_message_id}>
      <td>{message.username}</td>
      <td>{message.message}</td>
      <td>{message.subject}</td>
      <td>{message.date}</td>
      <td><Link to={userLink}><Badge>Consulter</Badge></Link></td>
    </tr>
  )
}

class ForumMessages extends Component {
  constructor(props){
    super(props)
    this.state = {
      forumMesages: [],
      forumUpdated : false
    }
  }


  updateThreads=()=>{
    this.setState({forumUpdated:!this.state.forumUpdated});
    console.log("CHILD UPDATED")
  }

  componentDidMount() {
    axios.get('http://localhost:8080/ServletSample_war_exploded/forum', {
      firstName: 'Fred',
      lastName: 'Flintstone'
    }).then(response => {
      this.setState({forumMesages : response.data})
      console.log(response.data);
    });
  }

  render() {
    return (
      <tbody>{this.state.forumMesages.map((fm,index)=>
        <MessageRow key={index} fm={fm}/>
      )}</tbody>
    )
  }
}

export default ForumMessages;
