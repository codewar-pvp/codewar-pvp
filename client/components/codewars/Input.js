import React from 'react'
import {connect} from 'react-redux'
import history from '../../history'
import {
  Form,
  TextArea,
  Button,
  Header,
  Icon,
  Message,
  Container,
  Item,
  Grid
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
    const id = this.props.match.params.id
    const question = this.props.questions.filter(item => item.id == id)[0]
    return question ? (
      <Container>
        <Item style={{marginBottom: '10px'}}>
          <Item.Content>
            <Item.Header as="h4">
              <Icon name="question circle" size="small" />
              {question.title}
            </Item.Header>
            <Item.Description>
              <p>{question.description}</p>
            </Item.Description>
          </Item.Content>
        </Item>
        <Form>
          <TextArea
            placeholder="Please write your code..."
            rows={20}
            value={this.state.code}
            autoHeight
            onChange={this.handleChange}
          />
          <Grid style={{marginBottom: '10px'}}>
            <Grid.Row columns={2}>
              <Grid.Column
                floated="left"
                width={6}
                style={{marginLeft: '0', paddingLeft: '0'}}
              >
                <Button
                  onClick={this.handleSubmit}
                  positive
                  style={{width: '200px', margin: '10px 0 10px 0'}}
                >
                  Run
                </Button>
              </Grid.Column>
              <Grid.Column
                floated="right"
                width={6}
                style={{marginRight: '0', paddingRight: '0'}}
              >
                <Button
                  onClick={() => history.push('/questions')}
                  attached="bottom"
                  floated="right"
                  negative
                  style={{
                    width: '200px',
                    margin: '10px 0 10px 0',
                    textAlign: 'center'
                  }}
                >
                  Back to All Questions
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
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
    ) : null
  }
}

const mapStateToProps = state => ({
  code: state.codeReducer.code,
  result: state.codeReducer.result,
  questions: state.questionReducer.questions
})
const mapDispatch = dispatch => ({
  testCode: code => dispatch(postCode(code))
})

export default connect(mapStateToProps, mapDispatch)(userInput)
