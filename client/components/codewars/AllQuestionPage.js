import React from 'react'
import {connect} from 'react-redux'
import {Form} from 'semantic-ui-react'

/**
 * COMPONENT
 */
class AllQuestionPage extends React.Component {
  render() {
    return <div />
  }
}

const mapStateToProps = state => ({
  code: state.codeReducer.code,
  result: state.codeReducer.result
})
const mapDispatch = dispatch => ({
  testCode: code => dispatch(postCode(code))
})

export default connect(mapStateToProps, mapDispatch)(AllQuestionPage)
