import React from 'react'
import {Item, Icon} from 'semantic-ui-react'
import {connect} from 'react-redux'

const QuestionHeader = props => (
  <Item style={{marginBottom: '10px'}}>
    <Item.Content>
      <Item.Header as="h4" style={{color: 'gold'}}>
        <Icon name="diamond" size="small" />
        {props.question.title}
      </Item.Header>
      <Item.Description>
        <p>{props.question.description}</p>
      </Item.Description>
    </Item.Content>
  </Item>
)

const mapStateToProps = state => ({
  result: state.codeReducer.result
})

export default connect(mapStateToProps, null)(QuestionHeader)
