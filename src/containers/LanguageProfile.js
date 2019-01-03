import React from 'react'
import {Link, Redirect} from 'react-router-dom'
import { Button} from "semantic-ui-react";
import { Card, Icon, Image } from 'semantic-ui-react'


class LanguageProfile extends React.Component{
  constructor(){
    super()
    this.state={
      current_language: null
    }
  }

  componentDidMount(){
    let id = this.props.languageID
    fetch(`http://localhost:3000/languages/${id}`)
    .then(res=>res.json())
    .then(data=> {
      console.log(data)
      this.setState({
        current_language: data
      })
    })
  }

  render(){
  return this.props.currentUser && this.state.current_language ? (
      <div>
      <div className="LanguageHeader">
        <h1>{this.state.current_language.name} </h1>
        <h2> Native name: {this.state.current_language.nativeName}</h2>
      </div>
    
      <h3>Flashcards:</h3>
      <div className="ui cards">
      {this.state.current_language.decks.map(deck => {
        return(
          <div key={deck.id} className="card" onClick={()=>this.props.handleClick(deck)}>
            <div className="content">
            <div className="header">
              {deck.name}
              </div>
              <div className="meta">
              {(this.props.languages.filter(language=> language.id === deck.language_id))[0].name}
              </div>
          </div>

          <Link to={`/decks/${deck.id}`}>
            <Button data-itinerary-id={deck.id} color="teal" content='View Cards' />
          </Link>
          </div>
        )
      })}
      <div className="LangUsers">
      <h3>Check out others learning the same language!</h3>
        <Card.Group itemsPerRow={2}>
      {this.state.current_language.users.map(user => {
        return(
          <Link key={user.id} to={`/profile/${user.id}`}>
            <Card>
            <Image src={user.image} />
            <Card.Content>
              <Card.Header>{user.username}</Card.Header>
            </Card.Content>
          </Card>
                   </Link>
                 )
               })}
             </Card.Group>
             </div>

      </div>
      </div>
    ) : null
  }

}

export default LanguageProfile
