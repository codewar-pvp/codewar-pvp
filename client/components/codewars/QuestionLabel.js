import React from 'react'
import {Label} from 'semantic-ui-react'

const QuestionLabel = props => {
  if (props.level === 'Hard') {
    return (
      <Label as="a" color="red" tag size="small">
        Hard
      </Label>
    )
  } else if (props.level === 'Medium') {
    return (
      <Label as="a" color="yellow" tag size="small">
        Medium
      </Label>
    )
  } else {
    return (
      <Label as="a" color="teal" tag size="small">
        Easy
      </Label>
    )
  }
}

export default QuestionLabel
