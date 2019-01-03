import React from 'react'
import {Redirect} from 'react-router-dom'
import {Link} from 'react-router-dom'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'
import { Card, Icon, Image } from 'semantic-ui-react'

class BrowseUsers extends React.Component{
  constructor(){
    super()
    this.state={
      searchTerm: ""
    }
  }


  handleSearchChange = (event, {value}) => {
      this.setState({
        searchTerm: value
      })
}

  render(){

  let { currentUser } = this.props

  const otherUsers = this.props.users.filter(user=> user.id !== currentUser.id)

  const searchedUsers = otherUsers.filter(user=> {
    return user.username.toLowerCase().includes(this.state.searchTerm)

  })

console.log(searchedUsers)

   return currentUser ? (

      <div>
      <Search className="search-feature" onSearchChange={_.debounce(this.handleSearchChange, 500)} showNoResults={false} />

    <br/><br/>
         <Card.Group itemsPerRow={3}>
              {searchedUsers.map(user=> {
                return(
                  <Link key={user.id} to={`/profile/${user.id}`}>
                  <Card>
           <Image src={user.image} />
           <Card.Content>
             <Card.Header>{user.username}</Card.Header>

             <Card.Description>
             <ul>
              {user.languages.map(language => {
                return(
                  <li key={language.id}> {language.name} </li>
                )
              })}
              </ul>
             </Card.Description>
           </Card.Content>

         </Card>

                  </Link>
                )
              })}
            </Card.Group>
      </div>
    ) : <Redirect to='/login' />
  }
}

export default BrowseUsers
