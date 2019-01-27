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
    title: 'Two Sum',
    description: 'asdhjfkashdjkfhjkansjdkfnkjanskd',
    level: 'Hard',
    rating: 3,
    author: 'Scott',
    category: 'ARRAY, CONTROL FLOW'
  },
  {
    id: 2,
    title: 'Binary Watch',
    description:
      'A binary watch has 4 LEDs on the top which represent the hours (0-11)...',
    level: 'Medium',
    rating: 1,
    author: 'Jason',
    category: 'ARRAY, FUNDAMENTALS'
  },
  {
    id: 3,
    title: 'Poor Pigs',
    description: 'asdhjfkashdjkfhjkansjdkfnkjanskd',
    level: 'Medium',
    rating: 5,
    author: 'Stuart',
    category: 'ARRAY, NUMBERS'
  },
  {
    id: 4,
    title: 'Binary Search',
    description: 'asdhjfkashdjkfhjkansjdkfnkjanskd',
    level: 'Easy',
    rating: 4,
    author: 'Scott',
    category: 'ARRAY,DATA STRUCTURE'
  },
  {
    id: 5,
    title: 'Happy Number',
    description: 'asdhjfkashdjkfhjkansjdkfnkjanskd',
    level: 'Easy',
    rating: 2,
    author: 'Shan',
    category: 'ARRAY, ALGORITHMS'
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
                  verticalAlign="top"
                  color="yellow"
                />
                <List.Content>
                  <Grid style={{marginBottom: '10px'}}>
                    <Grid.Column floated="left" width={6}>
                      <List.Header as="a">
                        <NavLink
                          to={`/questions/${question.id}`}
                          style={{color: 'white'}}
                        >
                          {question.title}
                        </NavLink>
                      </List.Header>
                      <List.Description
                        as="a"
                        style={{color: 'wheat', padding: '5px 0 5px 0'}}
                      >
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
