import React from 'react'
import {Button, TextArea, Grid, Input} from 'semantic-ui-react'

const Chat = props => (
  <Grid style={{marginLeft: '10%'}}>
    <Grid.Row>
      <TextArea
        rows={15}
        style={{width: '100%', backgroundColor: 'gray', color: 'white'}}
      >
        Chat
      </TextArea>
    </Grid.Row>
    <Grid.Row>
      <Input
        icon="users"
        iconPosition="left"
        placeholder="Search users..."
        style={{width: '80%'}}
      />
      <Button>Submit</Button>
    </Grid.Row>
  </Grid>
)

export default Chat
