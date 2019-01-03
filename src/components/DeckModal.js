import React from 'react'
import { Button, Header, Modal, Dropdown} from 'semantic-ui-react'
import { Redirect, Link} from 'react-router-dom'



class DeckModal extends React.Component{
  constructor(){
    super()
    this.state={
      name: "",
      description: "",
      user_id: "",
      modalOpen: false,
      redirectId: null,
      language_id: ""
    }
  }

  handleChange = (event) => {
  this.setState({
    [event.target.name]: event.target.value,
    user_id: this.props.currentUser.id,
  })
}

handleSelectorChange = (event, data) => {
  this.setState({
    language_id: data.value
  })
}


    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => this.setState({ modalOpen: false })

      handleSubmit = (e) => {
        e.preventDefault()
        let token = localStorage.getItem('token')
        let data = {
          name: this.state.name,
          description: this.state.description,
          user_id: this.state.user_id,
          language_id: this.state.language_id
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
          icon='add' color="teal"></Button>}
          open={this.state.modalOpen}
          onClose={this.handleClose}
          closeIcon>

            <Header icon='folder outline' content='Create a Deck of Cards' />
            <Modal.Content>
            <div className="field">
              <Dropdown
                     label="Language"
                     placeholder='Language'
                     fluid search selection options={this.props.options}
                     value={this.state.language}
                     onChange={this.handleSelectorChange}/>
            </div>
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
              <div className='field'>
                <label>Description</label>
                <input
                name="description"
                type="text"
                onChange={this.handleChange}
                value={this.state.description}
                placeholder='Description'
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
