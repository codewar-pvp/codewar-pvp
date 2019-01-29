import React from 'react'
import {connect} from 'react-redux'
import history from '../../history'
import brace from 'brace'
import AceEditor from 'react-ace'
import {Button, Icon, Message, Container, Item, Grid} from 'semantic-ui-react'
import 'brace/mode/javascript'
import 'brace/theme/monokai'
import {postCode} from '../../store/'

/**
 * COMPONENT
 */
class userInput extends React.Component {
  constructor(props) {
    super()
    this.state = {code: ''}
  }
  onChange = newValue => {
    this.setState({code: newValue})
  }
  handleSubmit = () => {
    this.props.testCode(this.state.code)
  }

  componentDidMount() {
    if (this.props.question && this.props.question.funcHeader) {
      this.setState({code: this.props.question.funcHeader})
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.question !== this.props.question) {
      this.setState({code: this.props.question.funcHeader})
    }
  }

  render() {
    const {question} = this.props
    return this.props.question && this.props.question.funcHeader ? (
      <Container>
        <Item style={{marginBottom: '10px'}}>
          <Item.Content>
            <Item.Header as="h4" style={{color: 'gold'}}>
              <Icon name="diamond" size="small" />
              {question.title}
            </Item.Header>
            <Item.Description>
              <p>{question.description}</p>
            </Item.Description>
          </Item.Content>
        </Item>
        <AceEditor
          mode="javascript"
          theme="monokai"
          showPrintMargin={false}
          showGutter={true}
          highlightActiveLine={true}
          onChange={this.onChange}
          name="codeEditor"
          value={this.state.code}
          width="100%"
          editorProps={{$blockScrolling: true}}
          setOptions={{cursorStyle: 'ace', fontFamily: 'monospace'}}
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

        {this.props.result ? (
          <Message attached="right" color="olive">
            <Icon name="user secret" />
            Result: {JSON.stringify(this.props.result)}
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
