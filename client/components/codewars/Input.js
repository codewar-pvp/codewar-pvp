import React from 'react'
import {connect} from 'react-redux'
import {Form, TextArea, Button, Header} from 'semantic-ui-react'
import {postCode} from '../../store/'

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
      <Form>
        <Header as="h2" icon="plug" content="Question Content will be here" />
        <TextArea
          placeholder="Please write your code..."
          rows={20}
          value={this.state.code}
          autoHeight
          onChange={this.handleChange}
          style={{margin: '10px', width: '98%'}}
        />
        <Button
          onClick={this.handleSubmit}
          attached="bottom"
          positive
          style={{width: '200px', margin: '10px'}}
        >
          Run
        </Button>
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
