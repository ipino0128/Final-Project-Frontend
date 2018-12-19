import React from 'react'
import FlashcardsContainer from '../containers/FlashcardsContainer'
import CardModal from './CardModal'


class DeckDetails extends React.Component{
  constructor(){
    super()
    this.state={
      cards:[]
    }
  }

  componentDidMount(){
    fetch(`http://localhost:3000/cards`)
    .then(res=> res.json())
    .then(data => this.setState({
      cards: data
    }))
  }

  addCards = (card) => {
    this.setState({
      cards: [...this.state.cards, card]
    })
  }

render(){
  return(
    <div>
    {this.props.currentUser ?

      <div className="DeckDetails">
        <h2> {this.props.current_deck.name}</h2>
        <h5> description... </h5>
        <CardModal current_deck={this.props.current_deck} addCards={this.addCards}/>
        <FlashcardsContainer current_deck={this.props.current_deck} cards={this.state.cards}/>
      </div>
      : null
    }
    </div>
  )
}
}

export default DeckDetails
