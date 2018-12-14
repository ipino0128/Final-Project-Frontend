import React from 'react'

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
            <p>{this.props.card.back}</p>
          </div>
        </div>
      </div>
      </div>
    )
  }
}

export default Flashcard
