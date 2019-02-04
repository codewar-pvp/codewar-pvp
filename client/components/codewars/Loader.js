import React from 'react'
import {Segment, Dimmer, Image, Loader} from 'semantic-ui-react'

const LoadingPage = props => (
  <Segment>
    <Dimmer active>
      <Loader>Loading</Loader>
    </Dimmer>
    <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
  </Segment>
)

export default LoadingPage
