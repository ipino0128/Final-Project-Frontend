import React from 'react'
import {Link} from 'react-router-dom'
import { Button} from "semantic-ui-react";


class UserDecks extends React.Component{
  render(){

    return(
      <div className="MyFlashcards">
      <h3>Flashcards: </h3>
      <div className="ui cards">
              {this.props.currentFriend.decks.map(deck=> {
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
            </div>

      </div>

    )
  }
}

export default UserDecks
