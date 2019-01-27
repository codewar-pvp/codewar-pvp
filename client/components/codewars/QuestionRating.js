import React from 'react'
import {Rating} from 'semantic-ui-react'

const QuestionRating = props => (
  <Rating icon="heart" defaultRating={props.rating} maxRating={5} disabled />
)

export default QuestionRating
