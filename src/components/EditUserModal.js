import React from 'react'
import { Button, Header, Modal, Dropdown} from 'semantic-ui-react'


class EditUserModal extends React.Component{
  constructor(){
    super()
    this.state={
      username: "",
      bio: "",
      image: "",
      modalOpen: false,
      redirectId: null,
    }
  }

  handleChange = (event) => {
  this.setState({
    [event.target.name]: event.target.value,

  })
}

    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => this.setState({ modalOpen: false })


    handleSubmit = (e) => {
        e.preventDefault()
        let token = localStorage.getItem('token')

        let data = {
          name: this.state.username,
          bio: this.state.bio,
          image: this.state.image
        }
        fetch(`http://localhost:3000/users/${this.props.currentUser.id}`, {
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

            <Header icon='edit' content='Edit Your Profile' />
            <Modal.Content>
            <form className='ui form' onSubmit={this.handleSubmit}>
              <div className='field'>
                <label>Username</label>
                <input
                name="username"
                type="text"
                onChange={this.handleChange}
                value={this.state.username}
                placeholder='username'
                />
              </div>
              <div className='field'>
                <label>Bio</label>
                <input
                name="bio"
                type="text"
                onChange={this.handleChange}
                value={this.state.bio}
                placeholder='Description'
                />
              </div>
              <div className='field'>
                <label>Profile Picture</label>
                <input
                name="image"
                type="text"
                onChange={this.handleChange}
                value={this.state.image}
                placeholder='Profile Picture'
                />
              </div>
              <Button type="submit"> Update </Button>
            </form>
            </Modal.Content>
          </Modal>

      </div>
    )
  }
}

export default EditUserModal
