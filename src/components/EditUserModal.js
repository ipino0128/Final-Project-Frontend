import React from 'react'
import { Button, Header, Modal, Dropdown} from 'semantic-ui-react'


class EditUserModal extends React.Component{
  constructor(){
    super()
    this.state={
      username: "",
      image: "",
      coverphoto: "",
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
          image: this.state.image,
          coverphoto: this.state.coverphoto
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
                <label>Profile Picture</label>
                <input
                name="image"
                type="text"
                onChange={this.handleChange}
                value={this.state.image}
                placeholder='Profile Picture'
                />
              </div>
              <div className='field'>
                <label>Cover Photo</label>
                <input
                name="coverphoto"
                type="text"
                onChange={this.handleChange}
                value={this.state.coverphoto}
                placeholder='Cover Photo'
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
