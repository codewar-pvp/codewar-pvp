import React from 'react'
import {connect} from 'react-redux'
import {List, Container, Grid, Button, Popup} from 'semantic-ui-react'
import Loader from './Loader'

class FriendPopup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isButtonDisabled: false
    }
  }

  render() {
    const user = this.props.user
    const question = this.props.question
    if (!user.name) {
      return <Loader />
    } else {
      return (
        <Popup
          trigger={
            <Button inverted color="teal">
              Challenge Friend
            </Button>
          }
          content={
            this.props.onlineFriends ? (
              <List>
                {this.props.onlineFriends.map((friend, i) => {
                  return (
                    <List.Item key={i}>
                      <Button
                        inverted
                        color="yellow"
                        onClick={() => {
                          this.props.handleChallenge(friend, question)
                          this.setState({
                            isButtonDisabled: true
                          })
                          // for now set it to 3 seconds
                          setTimeout(
                            () => this.setState({isButtonDisabled: false}),
                            10000
                          )
                        }}
                        loading={this.state.isButtonDisabled}
                        disabled={this.state.isButtonDisabled}
                      >
                        {friend.name}
                      </Button>
                    </List.Item>
                  )
                })}
              </List>
            ) : (
              <Loader />
            )
          }
          on="click"
          position="top right"
          style={{backgroundColor: '#5A3DBC'}}
        />
      )
    }
  }
}

const mapStateToProps = state => ({
  onlineFriends: state.userReducer.onlineFriends
})

export default connect(mapStateToProps, null)(FriendPopup)
