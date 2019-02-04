import React from 'react'
import {Message, Icon} from 'semantic-ui-react'
import {connect} from 'react-redux'

const Result = props => (
  <Message attached="right" color="olive">
    <Icon name="user secret" />
    Result: {JSON.stringify(props.result)}
  </Message>
)

const mapStateToProps = state => ({
  result: state.codeReducer.result
})

export default connect(mapStateToProps, null)(Result)
