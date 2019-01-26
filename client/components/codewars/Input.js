import React from 'react'
import {connect} from 'react-redux'
import {Form} from 'semantic-ui-react'
import {postCode} from '../../store/codeReducer'

/**
 * COMPONENT
 */
class userInput extends React.Component {
  state = {code: ''}

  handleChange = e => {
    this.setState({code: e.target.value})
  }
  handleSubmit = () => {
    this.props.testCode(this.state.code)
  }
  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.TextArea
          label="About"
          placeholder="Please write your code..."
          value={this.state.code}
          onChange={this.handleChange}
        />
        <Form.Button>Run</Form.Button>
      </Form>
    )
  }
}

const mapStateToProps = state => ({
  code: state.codeReducer.code,
  result: state.codeReducer.result
})
const mapDispatch = dispatch => ({
  testCode: code => dispatch(postCode(code))
})

export default connect(mapStateToProps, mapDispatch)(userInput)
