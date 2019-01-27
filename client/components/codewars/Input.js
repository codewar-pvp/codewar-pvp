import React from 'react'
import {connect} from 'react-redux'
import {
  Form,
  TextArea,
  Button,
  Header,
  Icon,
  Message,
  Container
} from 'semantic-ui-react'
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
      <Container>
        <Form>
          <Header as="h4">
            <Icon name="question circle" size="small" />
            Question Content will be here
          </Header>
          <TextArea
            placeholder="Please write your code..."
            rows={20}
            value={this.state.code}
            autoHeight
            onChange={this.handleChange}
          />
          <Button
            onClick={this.handleSubmit}
            attached="bottom"
            positive
            style={{width: '200px', margin: '10px 0 10px 0'}}
          >
            Run
          </Button>
        </Form>
        {this.props.result !== '' ? (
          <Message attached="bottom" color="olive">
            <Icon name="user secret" />
            Result: {this.props.result}
          </Message>
        ) : (
          <div />
        )}
      </Container>
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
