import React from 'react'
import {Label} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {selectedLevel} from '../../store/'

const QuestionLabel = props => {
  const handleClick = (e, data) => {
    props.selectedLevel(data.children)
  }

  if (props.level === 'Hard') {
    return (
      <Label onClick={handleClick} as="a" color="red" tag size="small">
        Hard
      </Label>
    )
  } else if (props.level === 'Medium') {
    return (
      <Label onClick={handleClick} as="a" color="yellow" tag size="small">
        Medium
      </Label>
    )
  } else {
    return (
      <Label onClick={handleClick} as="a" color="teal" tag size="small">
        Easy
      </Label>
    )
  }
}

const mapStateToProps = state => ({
  questions: state.questionReducer.questions
})
const mapDispatch = dispatch => ({
  selectedLevel: level => dispatch(selectedLevel(level))
})

export default connect(mapStateToProps, mapDispatch)(QuestionLabel)
