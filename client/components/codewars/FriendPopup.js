import React from 'react'
import {List, Container, Grid, Button, Popup} from 'semantic-ui-react'

const FriendPopup = props => {
  const user = props.user
  const question = props.question
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
          ''
        )
      }
      on="click"
      position="top right"
      style={{backgroundColor: '#5A3DBC'}}
    />
  )
}

export default FriendPopup
