import React from 'react'
import {List, Container, Grid, Button, Popup} from 'semantic-ui-react'




const FriendPopup = props => {
  const user = props.user
  return (
    <Popup
      trigger={<Button inverted color='teal'>Challenge Friend</Button>}
      content={

      user.friends ?
      <List>
{      user.friends.map((friend, i) => {
          return <List.Item key={i}><Button inverted color='yellow'>{friend.name}</Button></List.Item>
      })}
      </List>
      : ""
      }
      on='click'
      position='top right'
      style={{backgroundColor:'#5A3DBC'}}
    />

  )

}

export default FriendPopup
