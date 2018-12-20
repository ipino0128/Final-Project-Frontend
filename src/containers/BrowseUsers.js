import React from 'react'
import {Redirect} from 'react-router-dom'
import {Link} from 'react-router-dom'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'

class BrowseUsers extends React.Component{
  constructor(){
    super()
    this.state={
      users: [],
      searchTerm: ""
    }
  }

  componentDidMount(){
    fetch('http://localhost:3000/users')
    .then(res=>res.json())
    .then(data => this.setState({
      users: data
    }))
  }
  handleSearchChange = (event, {value}) => {
      this.setState({
        searchTerm: value
      })
}

  render(){

  let { currentUser } = this.props

  const otherUsers = this.state.users.filter(user=> user.id !== currentUser.id)

  const searchedUsers = otherUsers.filter(user=> {
    return user.username.toLowerCase().includes(this.state.searchTerm)
  })


   return currentUser ? (

      <div>
      <Search className="search-feature" onSearchChange={_.debounce(this.handleSearchChange, 500)} showNoResults={false} />
      {searchedUsers.map(user=> {
        return(
          <Link key={user.id} to={`/profile/${user.id}`}>
          <div key={user.id} className="ui card" >
            <div className="image">
          
              <img src={user.image} alt="sdkfl"/>
            </div>
            <div className="content">
              <p className="header">{user.username}</p>
              <div className="description">
                my bio goes here
              </div>
            </div>
            <div className="extra content">

                <i className="user icon"></i>
                 Friends

            </div>
          </div>
          </Link>
        )
      })}
      </div>
    ) : <Redirect to='/login' />
  }
}

export default BrowseUsers
