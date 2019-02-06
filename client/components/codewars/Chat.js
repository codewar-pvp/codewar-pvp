import React from 'react'
import {Button, Grid, Input, List, Form} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {submitMessage} from '../../store/chatReducer'

class Chat extends React.Component {
  constructor() {
    super()
    this.state = {
      message: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.chatMessages &&
      this.props.chatMessages.length !== prevProps.chatMessages.length
    ) {
      const objDiv = document.getElementById('list')
      objDiv.scrollTop = objDiv.scrollHeight
    }
  }

  handleChange(e) {
    this.setState({
      message: e.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.submitMessage({
      content: this.state.message,
      user: this.props.user
    })
    this.setState({
      message: ''
    })
  }

  render() {
    return (
      <Grid style={{marginLeft: '10%'}}>
        <Grid.Row>
          <List
            id="list"
            style={{
              height: '250px',
              width: '450px',
              overflow: 'scroll',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: 'rgb(64, 64, 64)'
            }}
          >
            <div />
            {this.props.chatMessages
              ? this.props.chatMessages.map((message, i) => {
                  return (
                    <List.Item
                      style={{marginLeft: '10px', marginTop: '10px'}}
                      key={i}
                    >
                      {message.user.name === this.props.user.name ? (
                        <div style={{color: 'royalblue', display: 'inline'}}>
                          {' '}
                          {message.user.name + ':'}
                        </div>
                      ) : (
                        <div style={{color: 'crimson', display: 'inline'}}>
                          {' '}
                          {message.user.name + ':'}
                        </div>
                      )}
                      <div style={{display: 'inline'}}> {message.content} </div>
                    </List.Item>
                  )
                })
              : ''}
          </List>
        </Grid.Row>
        <Form
          onSubmit={this.handleSubmit}
          style={{paddingLeft: 0, marginLeft: 0, width: '100%'}}
        >
          <Form.Group style={{width: '100%'}}>
            <Form.Input
              icon="users"
              iconPosition="left"
              placeholder="Chat..."
              value={this.state.message}
              onChange={this.handleChange}
              style={{width: '320px'}}
            />
            <Form.Button
              style={{
                marginTop: '14%',
                width: '100px',
                color: 'white',
                backgroundColor: 'Blue'
              }}
              content="Submit"
            />
          </Form.Group>
        </Form>
      </Grid>
    )
  }
}

const mapStateToProps = state => ({
  chatMessages: state.chatReducer.chatMessages,
  user: state.userReducer.user
})

const mapDispatch = dispatch => ({
  submitMessage: message => dispatch(submitMessage(message))
})

export default connect(mapStateToProps, mapDispatch)(Chat)
