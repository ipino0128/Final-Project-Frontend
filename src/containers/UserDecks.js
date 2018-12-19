import React from 'react'
import {Link} from 'react-router-dom'

class UserDecks extends React.Component{
  render(){

    return(
      <div className="UserFlashcards">
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
                          Created on: {deck.created_at}
                        </div>
                        <div className="description">
                          description....
                        </div>
                    </div>

                    <Link to={`/decks/${deck.id}`}>
                      <button data-itinerary-id={deck.id}>View Cards</button>
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
