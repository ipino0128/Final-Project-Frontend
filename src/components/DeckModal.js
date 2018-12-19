import React from 'react'
import { Button, Header, Modal} from 'semantic-ui-react'
import { Redirect, Link} from 'react-router-dom'



class DeckModal extends React.Component{
  constructor(){
    super()
    this.state={
      name: "",
      user_id: "",
      modalOpen: false,
      redirectId: null
    }
  }

  handleChange = (event) => {
  this.setState({
    [event.target.name]: event.target.value,
    user_id: this.props.currentUser.id,
  })
}
    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => this.setState({ modalOpen: false })

      handleSubmit = (e) => {
        e.preventDefault()
        let token = localStorage.getItem('token')
        let data = {
          name: this.state.name,
          user_id: this.state.user_id,
        }
        fetch('http://localhost:3000/decks', {
        method: "POST",
        headers: {
          "Authorization" : `Bearer ${token}`,
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(data)
      }).then(res=> res.json())
      .then(deck => {
        console.log(deck)
        this.handleClose()
        this.props.addDecks(deck)
        this.props.updateCurrentDeck(deck)
        this.setState({
          redirectId: deck.id
        })
      })

    }


  render(){
    if (this.state.redirectId){
      return <Redirect to={`decks/${this.state.redirectId}`}/>
    }
    return(
      <div>
      <Modal trigger={<Button
          onClick={this.handleOpen}
          icon='add'></Button>}
          open={this.state.modalOpen}
          onClose={this.handleClose}
          closeIcon>

            <Header icon='folder outline' content='Create a Deck of Cards' />
            <Modal.Content>
            <form className='ui form' onSubmit={this.handleSubmit}>
              <div className='field'>
                <label>Name</label>
                <input
                name="name"
                type="text"
                onChange={this.handleChange}
                value={this.state.name}
                placeholder='Name'
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

export default DeckModal
