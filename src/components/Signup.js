import React from 'react'
import {Link, Redirect} from 'react-router-dom'
import { Button, Form, Segment, Message, Divider, Grid } from "semantic-ui-react";

class Signup extends React.Component{
    constructor(){
    super()
    this.state={
      username: "",
      password: "",
      password_confirmation: "",
      image: "",
      coverphoto: "",
      bio: "",
      redirect: false
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    let data = { user: {
      username: this.state.username,
      password: this.state.password,
      password_confirmation: this.state.password_confirmation,
      image: this.state.image,
      coverphoto: this.state.coverphoto,
      bio: this.state.bio
      }
    }
    fetch('http://localhost:3000/users', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(data)
  }).then(res=> res.json())
  .then(data => {
      console.log(data)
      this.props.updateCurrentUser(data.user, data.user.decks)
      localStorage.setItem("token", data.jwt)
      localStorage.setItem("user", JSON.stringify(data.user))
      this.setState({
        redirect: true
      })
    })
  }


  render(){
    if (this.state.redirect){
      return <Redirect to={`login`}/>
    }
    return(

      <div className="containerlogin">
<div className="signuppage">
      <Segment placeholder>
          <Form onSubmit={this.handleSubmit}>
            <Form.Input
              icon='user'
              iconPosition='left'
              label="username*"
              placeholder="username"
              name="username"
              onChange={this.handleChange}
              value={this.state.username} />

            <Form.Input
              icon='lock'
              iconPosition='left'
              label="password*"
              type="password"
              placeholder="password"
              name="password"
              onChange={this.handleChange}
              value={this.state.password}/>
              <Form.Input
                icon='lock'
                iconPosition='left'
                label="password confirmation*"
                type="password"
                placeholder="password confirmation"
                name="password_confirmation"
                onChange={this.handleChange}
                value={this.state.password_confirmation}/>
              <Form.Input
                label="bio"
                placeholder="bio"
                name="bio"
                onChange={this.handleChange}
                value={this.state.bio}/>
              <Form.Input
                label="profile picture"
                placeholder="profile picture"
                name="image"
                onChange={this.handleChange}
                value={this.state.image}/>
              <Form.Input
                label="cover photo"
                placeholder="cover photo"
                name="coverphoto"
                onChange={this.handleChange}
                value={this.state.coverphoto}/>


            <Button color="teal" content='Sign up' />
          </Form>
    </Segment>

</div>

      </div>
    )
  }
}

export default Signup
