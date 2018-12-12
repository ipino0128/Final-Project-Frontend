import React from "react";
import { withRouter } from "react-router";
import {Link} from 'react-router-dom'
import { Button, Form, Segment, Message } from "semantic-ui-react";

class Login extends React.Component {
  state = {
    username: "",
    password: ""
  };

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleLoginSubmit = () => {
    console.log('attempting to log in')
    fetch(`http://localhost:3000/login`, {
    	method:"POST",
    	headers: {
    		"Content-type" : "application/json",
    		"Accept" : "application/json"
    	},
    	body: JSON.stringify({
    		username: this.state.username,
    		password: this.state.password
    	})
    }).then(res => res.json())
    .then(data => {
      if(data.error){
        alert('incorrect username or password')
      }else{
        localStorage.setItem('token', data.token)
        this.props.updateCurrentUser(data.user)
        //set the state of currentUser, to be the user that is logged
      }
    })
  };

  render() {
    return (
      <Segment className="loginfolder">
        <Form
          onSubmit={this.handleLoginSubmit}
          size="mini"
          key="mini"
          loading={this.props.authenticatingUser}
          error={this.props.failedLogin}
        >
          <Message
            error
            header={this.props.failedLogin ? this.props.error : null}
          />
          <Form.Group widths="equal">
            <Form.Input
              label="username"
              placeholder="username"
              name="username"
              onChange={this.handleChange}
              value={this.state.username}
            />
            <Form.Input
              type="password"
              label="password"
              placeholder="password"
              name="password"
              onChange={this.handleChange}
              value={this.state.password}
            />
          </Form.Group>
          <Button type="submit">Login</Button>
        </Form>
          <Link to={`/create`}>
        <Button> Sign up</Button>
        </Link>
      </Segment>
    );
  }
}

export default withRouter(Login);
