import React from 'react'
import {List, Container, Grid, Button, Popup} from 'semantic-ui-react'




const FriendPopup = props => {

  return (
    <Popup
      trigger={<Button inverted color='teal'>Challenge Friend</Button>}
      content={<List>
                <List.Item>Friend 1</List.Item>
                <List.Item>Friend 2</List.Item>
              </List>}
      on='click'
      position='top right'
    />

  )

}

export default FriendPopup
