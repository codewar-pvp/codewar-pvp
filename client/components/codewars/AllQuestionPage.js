import React from 'react'
import {connect} from 'react-redux'
import {List, Container, Grid} from 'semantic-ui-react'
import {postCode} from '../../store/'
import QuestionLabel from './QuestionLabel'
import QuestionRating from './QuestionRating'
import {NavLink} from 'react-router-dom'

/**
 * COMPONENT
 */

const questions = [
  {
    id: 1,
    title: 'question1',
    description: 'asdhjfkashdjkfhjkansjdkfnkjanskd',
    level: 'Hard',
    rating: 3,
    author: 'Scott',
    category: 'array, control flow'
  },
  {
    id: 2,
    title: 'question2',
    description: 'asdhjfkashdjkfhjkansjdkfnkjanskd',
    level: 'Medium',
    rating: 1,
    author: 'Jason',
    category: 'array, fundamentals'
  },
  {
    id: 3,
    title: 'question3',
    description: 'asdhjfkashdjkfhjkansjdkfnkjanskd',
    level: 'Medium',
    rating: 5,
    author: 'Stuart',
    category: 'array, numbers'
  },
  {
    id: 4,
    title: 'question4',
    description: 'asdhjfkashdjkfhjkansjdkfnkjanskd',
    level: 'Easy',
    rating: 4,
    author: 'Scott',
    category: 'array, data structure'
  },
  {
    id: 5,
    title: 'question5',
    description: 'asdhjfkashdjkfhjkansjdkfnkjanskd',
    level: 'Easy',
    rating: 2,
    author: 'Shan',
    category: 'array, algorithm'
  }
]
class AllQuestionPage extends React.Component {
  render() {
    return questions ? (
      <Container>
        <List divided relaxed>
          {questions.map((question, index) => {
            return (
              <List.Item key={index}>
                <List.Icon
                  name="rocket"
                  size="large"
                  verticalAlign="middle"
                  color="olive"
                />
                <List.Content>
                  <Grid>
                    <Grid.Column floated="left" width={6}>
                      <List.Header as="a">
                        <NavLink to={`/questions/${question.id}`}>
                          {question.title}
                        </NavLink>
                      </List.Header>
                      <List.Description as="a">
                        {question.description}
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
                      width={6}
                      verticalAlign="middle"
                    >
                      <QuestionRating rating={question.rating} />
                    </Grid.Column>
                    <Grid.Column
                      floated="right"
                      width={4}
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
  result: state.codeReducer.result
})
const mapDispatch = dispatch => ({
  testCode: code => dispatch(postCode(code))
})

export default connect(mapStateToProps, mapDispatch)(AllQuestionPage)
