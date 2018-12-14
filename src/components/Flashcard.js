import React from 'react'

class Flashcard extends React.Component{
  render(){
    return(
      <div className="Flashcard">
      <div class="flip-card">
        <div class="flip-card-inner">
          <div class="flip-card-front">
            <p>{this.props.card.front} </p>
          </div>
          <div class="flip-card-back">
            <p>{this.props.card.back}</p>
          </div>
        </div>
      </div>
      </div>
    )
  }
}

export default Flashcard
