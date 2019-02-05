import React from 'react'
import {Button, TextArea, Grid, Input, List} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {submitMessage} from '../../store/chatReducer'


class Chat extends React.Component {
  constructor() {
    super()
    this.state = {
      message: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.setState({
      message: e.target.value
    })
  }

  handleSubmit (event) {
    event.preventDefault()
    this.props.submitMessage({
      content: this.state.message,
      user: this.props.user
    })
    this.setState({
      message: ''
    })
  }

  render () {
    return (
      <Grid style={{marginLeft: '10%'}}>
      <Grid.Row>
        {/* <TextArea
          rows={15}
          style={{width: '100%', backgroundColor: 'gray', color: 'white'}}
        > */}
        <List>
          {this.props.chatMessages ? this.props.chatMessages.map((message, i) => {
            return <List.Item key={i}>{message.content}</List.Item>
          }): ""}
          </List>
        {/* </TextArea> */}
      </Grid.Row>
      <Grid.Row>
        <Input
          icon="users"
          iconPosition="left"
          placeholder="Search users..."
          style={{width: '80%'}}
          value={this.state.message}
          onChange={this.handleChange}
        />
        <Button onClick={this.handleSubmit}>Submit</Button>
      </Grid.Row>
    </Grid>
    )
  }
}

const mapStateToProps = state => ({
  chatMessages: state.chatReducer.chatMessages,
  user: state.user
})

// const mapStateToProps = state => ({
//   chatMessages: state.chatMessages,
//   user: state.user
// })

const mapDispatch = dispatch => ({
  submitMessage: message => dispatch(submitMessage(message))
})

export default connect(mapStateToProps, mapDispatch)(Chat)
