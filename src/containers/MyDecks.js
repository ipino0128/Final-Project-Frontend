import React from 'react'
import {Link} from 'react-router-dom'

class MyDecks extends React.Component{
  render(){
    return(
      <div className="MyFlashcards">
      <h3>My Flashcards: </h3>

      <div className="ui icon button" data-tooltip="Create new set of flashcards." data-position="top left" data-inverted="">
          <i className="add icon"></i>
      </div>

      <div className="ui cards">
          {this.props.currentUser.decks.map(deck=> {
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

export default MyDecks
