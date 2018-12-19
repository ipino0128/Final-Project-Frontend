import React from 'react'
import { Button, Header, Modal} from 'semantic-ui-react'
import { Redirect, Link} from 'react-router-dom'


class CardModal extends React.Component{
  constructor(){
    super()
    this.state={
      front: "",
      back: "",
      deck_id: "",
      modalOpen: false,
    }
  }

  handleChange = (event) => {
  this.setState({
    [event.target.name]: event.target.value,
    deck_id: this.props.current_deck.id,
  })
}
    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => this.setState({ modalOpen: false })

      handleSubmit = (e) => {
        e.preventDefault()
        let token = localStorage.getItem('token')
        let data = {
          front: this.state.front,
          back: this.state.back,
          deck_id: this.state.deck_id,
        }
        fetch('http://localhost:3000/cards', {
        method: "POST",
        headers: {
          "Authorization" : `Bearer ${token}`,
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(data)
      }).then(res=> res.json())
      .then(card => {
        console.log(card)
        this.props.addCards(card)
        this.handleClose()
      })

    }


  render(){
    return(
      <div>
      <Modal trigger={<Button
          onClick={this.handleOpen}
          icon='add'></Button>}
          open={this.state.modalOpen}
          onClose={this.handleClose}
          closeIcon>

            <Header icon='folder outline' content='Create a Flashcard' />
            <Modal.Content>
            <form className='ui form' onSubmit={this.handleSubmit}>
              <div className='field'>
                <label>Front</label>
                <input
                name="front"
                type="text"
                onChange={this.handleChange}
                value={this.state.front}
                placeholder='Front'
                />
              </div>
              <div className='field'>
                <label>Back</label>
                <input
                name="back"
                type="text"
                onChange={this.handleChange}
                value={this.state.back}
                placeholder='Back'
                />
              </div>
              <Button type="submit" > Create </Button>
            </form>
            </Modal.Content>
          </Modal>

      </div>
    )
  }
}

export default CardModal
