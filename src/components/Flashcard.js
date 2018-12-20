import React from 'react'
import EditCardModal from './EditCardModal'

class Flashcard extends React.Component{
  render(){
    return(
      <div className="Flashcard">
      <div className="flip-card">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <p>{this.props.card.front} </p>
          </div>
          <div className="flip-card-back">

          { this.props.currentUser.id !== this.props.current_deck.user_id ? null :
            <div>
            <EditCardModal card={this.props.card} updateCards={this.props.updateCards}/>
            <button> Delete Card</button> 
            </div>
           }
            <p>{this.props.card.back}</p>
          </div>
        </div>
      </div>
      </div>
    )
  }
}

export default Flashcard
