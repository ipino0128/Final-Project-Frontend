import React from "react";
import { withRouter } from "react-router";
import {Link} from 'react-router-dom'
import { Button, Form, Segment, Message, Divider, Grid } from "semantic-ui-react";

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
        user:{
          username: this.state.username,
          password: this.state.password
        }
    	})
    }).then(res => res.json())
    .then(data => {
      if(data.error){
        alert('incorrect username or password')
      }else{
        localStorage.setItem('token', data.jwt)
        this.props.updateCurrentUser(data.user)
        //set the state of currentUser, to be the user that is logged
      }
    })
  };

  render() {
    return (

<div className="containerlogin">
      <div className="loginpage">
            <Segment placeholder>
            <Grid columns={2} relaxed='very' stackable>
              <Grid.Column>
                <Form onSubmit={this.handleLoginSubmit}>
                  <Form.Input
                    icon='user'
                    iconPosition='left'
                    label="username"
                    placeholder="username"
                    name="username"
                    onChange={this.handleChange}
                    value={this.state.username} />

                  <Form.Input
                    icon='lock'
                    iconPosition='left'
                    label="password"
                    type="password"
                    placeholder="password"
                    name="password"
                    onChange={this.handleChange}
                    value={this.state.password}/>

                  <Button color="teal" content='Login' />
                </Form>
              </Grid.Column>
              <Grid.Column verticalAlign='middle'>
                <Link to={`/signup`}>
                <Button color="teal" content='Sign up' icon='signup' size='big' />
                </Link>
              </Grid.Column>
            </Grid>

            <Divider vertical>Or</Divider>
          </Segment>
      </div>
      </div>
    );
  }
}

export default withRouter(Login);
