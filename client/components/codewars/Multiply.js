import React from 'react'
import {connect} from 'react-redux'
import history from '../../history'
import brace from 'brace'
import AceEditor from 'react-ace'
import Loader from './Loader'
import Result from './Result'
import {Button, Container, Input, Grid, TextArea} from 'semantic-ui-react'
import 'brace/mode/javascript'
import 'brace/theme/monokai'
import Chat from './Chat'
import {postCode} from '../../store/'
import QuestionHeader from './QuestionHeader'

/**
 * COMPONENT
 */
class Multiply extends React.Component {
  constructor(props) {
    super()
    this.state = {
      code: '',
      isButtonDisabled: false,
      opponentsCode: 'dfgdsfgsdfgsdfasd'
    }
  }
  onChange = newValue => {
    this.setState({code: newValue})
  }
  opponentEnterCode = newValue => {
    console.log(newValue)
    this.setState({opponentsCode: newValue})
  }
  handleSubmit = () => {
    this.props.testCode({
      code: this.state.code,
      questionId: this.props.question.id
    })
    this.setState({
      isButtonDisabled: true
    })
    // for now set it to 3 seconds
    setTimeout(() => this.setState({isButtonDisabled: false}), 3000)
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
        <QuestionHeader question={question} />
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column>
              <AceEditor
                mode="javascript"
                theme="monokai"
                showPrintMargin={false}
                showGutter={true}
                highlightActiveLine={true}
                onChange={this.onChange}
                name="multiCodeEditor"
                value={this.state.code}
                width="100%"
                editorProps={{$blockScrolling: true}}
                setOptions={{cursorStyle: 'ace', fontFamily: 'monospace'}}
                wrapEnabled={true}
              />
            </Grid.Column>
            <Grid.Column>
              <Grid>
                <Grid.Row>
                  <AceEditor
                    mode="javascript"
                    theme="monokai"
                    name="output"
                    showGutter={false}
                    showPrintMargin={false}
                    // value={this.state.opponentsCode}
                    width="100%"
                    editorProps={{$blockScrolling: true}}
                    setOptions={{cursorStyle: 'ace', fontFamily: 'monospace'}}
                    wrapEnabled={true}
                    readOnly={true}
                    height="200px"
                    // onBlur={this.opponentEnterCode}
                  />
                </Grid.Row>
                <Grid.Row>
                  <Chat />
                </Grid.Row>
              </Grid>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Button
                onClick={this.handleSubmit}
                positive
                style={{width: '100px', margin: '10px 0 10px 0'}}
                loading={this.state.isButtonDisabled}
                disabled={this.state.isButtonDisabled}
              >
                Run
              </Button>
              <Button
                onClick={() => history.push('/questions')}
                negative
                style={{
                  width: '180px',
                  margin: '10px 0 10px 35%',
                  textAlign: 'center'
                }}
                floated="right"
              >
                Back to All Questions
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        {this.props.result ? <Result /> : null}
      </Container>
    ) : (
      <Loader />
    )
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

export default connect(mapStateToProps, mapDispatch)(Multiply)
