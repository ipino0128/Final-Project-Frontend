import React from 'react'
import {Redirect} from 'react-router-dom'

class BrowseUsers extends React.Component{
  constructor(){
    super()
    this.state={
      users: []
    }
  }

  componentDidMount(){
    fetch('http://localhost:3000/users')
    .then(res=>res.json())
    .then(data => this.setState({
      users: data
    }))
  }

  render(){
    let { currentUser } = this.props

   return currentUser ? (
     
      <div>
      {this.state.users.map(user=> {
        return(

          <div className="ui card" >
            <div className="image">
            <i className="edit icon" id="EditIcon"></i>
              <img src={user.image} alt="sdkfl"/>
            </div>
            <div className="content">
              <a className="header">{user.username}</a>
              <div className="description">
                my bio goes here
              </div>
            </div>
            <div className="extra content">
              <a>
                <i className="user icon"></i>
                 Friends
              </a>
            </div>
          </div>
        )
      })}
      </div>
    ) : <Redirect to='/login' />
  }
}

export default BrowseUsers
