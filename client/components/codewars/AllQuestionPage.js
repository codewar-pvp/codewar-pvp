import React from 'react'
import {connect} from 'react-redux'
import {List, Container, Grid, Button, Popup} from 'semantic-ui-react'
import {postCode, fetchAllQuestions, sendChallenge} from '../../store/'
import QuestionLabel from './QuestionLabel'
import QuestionRating from './QuestionRating'
import {NavLink} from 'react-router-dom'
import FriendPopup from './FriendPopup'
import socket from '../../socket'

/**
 * COMPONENT
 */

class AllQuestionPage extends React.Component {
  constructor() {
    super()
    this.state = {}
    this.handleChallenge = this.handleChallenge.bind(this)
  }

  handleChallenge() {
    socket.emit('challenge', this.props.user)
  }

  render() {
    const {questions} = this.props

    return questions ? (
      <Container>
        <List divided relaxed>
          {questions.map((question, index) => {
            return (
              <List.Item key={index}>
                <List.Icon
                  name="rocket"
                  size="large"
                  verticalAlign="top"
                  color="yellow"
                />
                <List.Content>
                  <Grid style={{marginBottom: '10px'}}>
                    <Grid.Column floated="left" width={6}>
                      <List.Header as="a">
                        <NavLink
                          to={`/questions/${question.id}`}
                          style={{color: 'gold'}}
                        >
                          {question.title}
                        </NavLink>
                      </List.Header>
                      <List.Description
                        as="a"
                        style={{color: 'wheat', padding: '5px 0 5px 0'}}
                      >
                        {question.description.slice(0, 100) + '...'}
                      </List.Description>

                      <List.Item>
                        <Grid>
                          <Grid.Column floated="left" width={6}>
                            <List.Icon
                              name="user"
                              size="small"
                              className="questionDetail"
                              color="violet"
                            />{' '}
                            {question.author}
                          </Grid.Column>
                          <Grid.Column floated="right" width={10}>
                            <List.Icon name="tag" size="small" color="brown" />{' '}
                            {question.category}
                          </Grid.Column>
                        </Grid>
                      </List.Item>
                    </Grid.Column>

                    <Grid.Column
                      floated="left"
                      width={1}
                      verticalAlign="middle"
                    >
                      <QuestionRating rating={question.rating} />
                    </Grid.Column>

                    <Grid.Column
                      floated="middle"
                      width={1}
                      verticalAlign="middle"
                    >
                      {/* <FriendPopup user={this.props.user} /> */}
                      <Button
                        inverted
                        color="purple"
                        onClick={this.handleChallenge}
                      >
                        Challenge!
                      </Button>
                    </Grid.Column>

                    <Grid.Column
                      floated="right"
                      width={1}
                      verticalAlign="middle"
                    >
                      <QuestionLabel level={question.level} />
                    </Grid.Column>
                  </Grid>
                </List.Content>
              </List.Item>
            )
          })}
        </List>
      </Container>
    ) : null
  }
}

const mapStateToProps = state => ({
  code: state.codeReducer.code,
  result: state.codeReducer.result,
  questions: state.questionReducer.questions,
  user: state.user
})
const mapDispatch = dispatch => ({
  testCode: code => dispatch(postCode(code)),
  fetchAllQuestions: () => dispatch(fetchAllQuestions())
})

export default connect(mapStateToProps, mapDispatch)(AllQuestionPage)
