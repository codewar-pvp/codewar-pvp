import React from 'react'
import {List, Container, Grid, Button, Popup} from 'semantic-ui-react'
import Loader from './Loader'

const FriendPopup = props => {
  const user = props.user
  const question = props.question

  if (!user.name) {
    return <div />
  } else {
    return (
      <Popup
        trigger={
          <Button inverted color="teal">
            Challenge Friend
          </Button>
        }
        content={
          user.friends ? (
            <List>
              {user.friends.map((friend, i) => {
                return (
                  <List.Item key={i}>
                    <Button
                      inverted
                      color="yellow"
                      onClick={() => props.handleChallenge(friend, question)}
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

export default FriendPopup
