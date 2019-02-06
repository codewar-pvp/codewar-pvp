import React from 'react'
import {connect} from 'react-redux'
import history from '../../history'
import brace from 'brace'
import AceEditor from 'react-ace'
import Loader from './Loader'
import Result from './Result'
import {
  Button,
  Container,
  Grid,
  TextArea,
  Modal,
  Header
} from 'semantic-ui-react'
import 'brace/mode/javascript'
import 'brace/theme/monokai'
import Chat from './Chat'
import {
  postCode,
  changeStatus,
  clearResult,
  clearError,
  clearChallenge,
  clearMessage
} from '../../store/'
import QuestionHeader from './QuestionHeader'
import socket from '../../socket'

/**
 * COMPONENT
 */
class Multiply extends React.Component {
  constructor(props) {
    super()
    this.state = {
      code: '',
      isButtonDisabled: false,
      opponentsCode: ''
    }
    socket.on('challengerCodeDownload', newValue => {
      this.opponentEnterCode(newValue)
    })
    this.gameOverHelper = this.gameOverHelper.bind(this)
    this.handleGameOver = this.handleGameOver.bind(this)
  }
  onChange = newValue => {
    this.setState({code: newValue})
    socket.emit('challengerCodeUpload', [
      this.props.challenger,
      this.hashCode(newValue)
    ])
  }
  hashCode = newValue => {
    return newValue
      .split('\n')
      .map(val => {
        return val
          .split('')
          .map(char => {
            return ' /\\{}[]()$!123456789;+-=|&%`<>"\''.includes(char)
              ? char
              : '0'
          })
          .join('')
      })
      .join('\n')
  }
  opponentEnterCode = newValue => {
    this.setState({opponentsCode: newValue})
  }

  gameOverHelper = () => {
    this.props.clearGameInfo()
    this.props.resetChallenge()
    this.props.clearErrorMsg()
    this.props.clearChat()
    this.props.clearResult()
    history.push('/questions')
  }

  handleGameOver = () => {
    setTimeout(() => this.gameOverHelper(), 5000)
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
      this.setState({
        code: this.props.question.funcHeader,
        opponentsCode: this.hashCode(this.props.question.funcHeader)
      })
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
        {this.props.win && !this.props.lose ? (
          <Modal
            basic
            centered
            defaultOpen
            closeIcon
            onMount={this.handleGameOver}
          >
            <Modal.Content>
              <Grid container textAlign="center">
                <Grid.Row>
                  <Header inverted as="h1" color="green">
                    YOU WIN!
                  </Header>
                </Grid.Row>
              </Grid>
            </Modal.Content>
          </Modal>
        ) : (
          ''
        )}

        {!this.props.win && this.props.lose ? (
          <Modal
            basic
            centered
            defaultOpen
            closeIcon
            onMount={this.handleGameOver}
          >
            <Modal.Content>
              <Grid container textAlign="center">
                <Grid.Row>
                  <Header inverted as="h1" color="red">
                    YOU LOSE!
                  </Header>
                </Grid.Row>
              </Grid>
            </Modal.Content>
          </Modal>
        ) : (
          ''
        )}

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
                height="90%"
                editorProps={{$blockScrolling: true}}
                setOptions={{cursorStyle: 'ace', fontFamily: 'monospace'}}
                wrapEnabled={true}
              />

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
            </Grid.Column>
            <Grid.Column>
              <Grid>
                <Grid.Row>
                  <TextArea
                    id="blurry-text"
                    disabled
                    value={this.state.opponentsCode}
                    onChange={this.opponentEnterCode}
                    style={{
                      backgroundColor: 'gray',
                      marginLeft: '10%',
                      fontSize: 10,
                      width: '78%',
                      height: '250px',
                      pointerEvents: 'none',
                      userSelect: 'none'
                    }}
                    onClick={() => false}
                  />
                </Grid.Row>
                <Grid.Row>
                  <Chat />
                </Grid.Row>
              </Grid>
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
  questions: state.questionReducer.questions,
  challenger: state.warReducer.challenge,
  challengeStatus: state.warReducer.challengeStatus,
  fightStatus: state.warReducer.fightStatus,
  lose: state.warReducer.lose,
  win: state.warReducer.win
})
const mapDispatch = dispatch => ({
  testCode: code => dispatch(postCode(code)),
  clearGameInfo: () => dispatch(changeStatus(false, false, null, null)),
  clearResult() {
    dispatch(clearResult())
  },
  clearErrorMsg() {
    dispatch(clearError())
  },
  resetChallenge() {
    dispatch(clearChallenge())
  },
  clearChat() {
    dispatch(clearMessage())
  }
})

export default connect(mapStateToProps, mapDispatch)(Multiply)
