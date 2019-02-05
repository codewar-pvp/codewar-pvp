import React from 'react'
import {Message, Icon} from 'semantic-ui-react'
import {connect} from 'react-redux'
import brace from 'brace'
import AceEditor from 'react-ace'

const Result = props => {
  return (
    <AceEditor
      mode="javascript"
      theme="monokai"
      name="output"
      showGutter={false}
      showPrintMargin={false}
      value={props.result.containerConsoleOutput}
      width="100%"
      editorProps={{$blockScrolling: true}}
      setOptions={{cursorStyle: 'ace', fontFamily: 'monospace'}}
      wrapEnabled={true}
      readOnly={true}
    />
  )
}

const mapStateToProps = state => ({
  result: state.codeReducer.result
})

export default connect(mapStateToProps, null)(Result)
