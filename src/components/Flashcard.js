import React from 'react'
import EditCardModal from './EditCardModal'
import {Button, Icon} from 'semantic-ui-react'

class Flashcard extends React.Component{

  deleteCard = () => {
    let token = localStorage.getItem('token')
    let id=this.props.card.id
    fetch(`http://localhost:3000/cards/${id}`, {
      method: "DELETE",
      headers: {
          "Authorization" : `Bearer ${token}`
      }
    }).then(res=>res.json())
    .then(data=> {
      this.props.removeCards(data)
    })
  }

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
            <Button color="black" onClick={this.deleteCard}><Icon name="remove" /></Button>
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
