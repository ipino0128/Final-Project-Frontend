import React, { Component } from 'react';
import '../App.css';
import NavBar from '../components/NavBar'
import Welcome from '../components/Welcome'
import Login from '../components/Login'
import Profile from './Profile'
import {Route, Redirect} from 'react-router-dom'


class App extends Component {
  constructor(){
    super()
    this.state={
      currentUser: null
    }
  }

  componentDidMount(){
    let token = localStorage.getItem('token')
    if(token){
       fetch(`http://localhost:3000/profile`, {
         method: "GET",
         headers: {
           "Authentication" : `Bearer ${token}`
         }
       }).then(res => res.json())
       .then(data => {
         this.setState({
           currentUser: data.user
         })
       })
     }
  }

  updateCurrentUser = (user) => {
   this.setState({currentUser: user})
  }

  logout = () => {
    localStorage.removeItem('token');
    this.setState({currentUser: null})
  }

  render() {
    return (
      <div className="App">
          <NavBar logged_in={!!this.state.currentUser} logout={this.logout}/>
          <Route exact path='/' render={()=>
                    <Welcome
                      />
                  }/>
          <Route exact path="/profile" render={() =>
              <Profile
              currentUser={this.state.currentUser}
              />}
              />
          <Route exact path="/login" render={() => this.state.currentUser ?
            <Redirect to='/'/> :
            <Login updateCurrentUser={this.updateCurrentUser}
            /> }
          />
      </div>
    )
  }
}

export default App;
