import React from 'react'
import { Button, Header, Modal} from 'semantic-ui-react'
import { Redirect, Link} from 'react-router-dom'

class EditDeckModal extends React.Component{
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
        let id = this.props.current_deck.id
        e.preventDefault()
        let token = localStorage.getItem('token')
        let data = {
          name: this.state.name,
          user_id: this.state.user_id,
        }
        fetch(`http://localhost:3000/decks/${id}`, {
        method: "PATCH",
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
        this.props.updateCurrentDeck(deck)
        this.setState({
          redirectId: deck.id
        })
      })
  }
  render(){

    return(
      <div>
      <Modal trigger={<Button
          onClick={this.handleOpen}
          icon='edit'></Button>}
          open={this.state.modalOpen}
          onClose={this.handleClose}
          closeIcon>

            <Header icon='folder outline' content='Edit Deck' />
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
              <Button type="submit" > Submit </Button>
            </form>
            </Modal.Content>
          </Modal>

      </div>
    )
  }
}

export default EditDeckModal
