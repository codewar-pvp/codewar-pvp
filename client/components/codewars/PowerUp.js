import React from 'react'
import {connect} from 'react-redux'
import history from '../../history'

import Loader from './Loader'

import {Button, Icon} from 'semantic-ui-react'

import {
  postCode,
  changeStatus,
  clearResult,
  clearError,
  clearChallenge,
  clearMessage
} from '../../store/'

import socket from '../../socket'

class PowerUp extends React.Component {
  constructor(props) {
    super()
    this.state = {
      code: '',
      isButtonDisabled: false,
      editorDisabled: false,
      powerUps: [],
      disablePowerUps: false
    }
    socket.on('challengerCodeDownload', newValue => {
      this.opponentEnterCode(newValue)
    })
    socket.on('grantPowerUp', powerUp => {
      this.receivedPowerUp(powerUp)
    })
    socket.on('updateLocalState', newState => {
      this.updateLocalState(newState)
    })
    this.onChange = this.onChange.bind(this)
    this.opponentEnterCode = this.opponentEnterCode.bind(this)
    this.updateLocalState = this.updateLocalState.bind(this)
    this.receivedPowerUp = this.receivedPowerUp.bind(this)
    this.usePowerUp = this.usePowerUp.bind(this)
  }
  onChange = newValue => {
    this.setState({code: newValue})
    socket.emit('challengerCodeUpload', [this.props.challenger, newValue])
  }
  opponentEnterCode = newValue => {
    this.setState({opponentsCode: newValue})
  }
  updateLocalState = newState => {
    console.log(this.state)
    this.setState(newState)
  }
  receivedPowerUp = powerUp => {
    console.log('received powerUp!', powerUp)
    this.setState(state => ({
      ...state,
      powerUps: [powerUp, ...state.powerUps]
    }))
  }
  usePowerUp = powerUpIndex => {
    console.log(this.state.powerUps[powerUpIndex])
    console.log('used powerUp!', this.state.powerUps[powerUpIndex])
    socket.emit('challengerUsePowerUp', this.state.powerUps[powerUpIndex])
    this.setState(state => ({
      ...state,
      powerUps: state.powerUps.filter((pUp, idx) => idx !== powerUpIndex)
    }))
  }

  render() {
    return this.state.powerUps ? (
      this.state.powerUps.map((powerUp, idx) => {
        if (powerUp === 'freeze') {
          return (
            <Button
              onClick={() => this.usePowerUp(idx)}
              positive
              style={{
                width: '100px',
                margin: '10px 0 10px 0',
                backgroundColor: 'lightBlue'
              }}
              disabled={
                !this.state.powerUps.length || this.state.disablePowerUps
              }
              key={idx}
            >
              <Icon name="snowflake" />FREEZE
            </Button>
          )
        } else if (powerUp === 'newLeaf') {
          return (
            <Button
              onClick={() => this.usePowerUp(idx)}
              positive
              style={{
                width: '100px',
                margin: '10px 0 10px 0',
                backgroundColor: 'red'
              }}
              disabled={
                !this.state.powerUps.length || this.state.disablePowerUps
              }
              key={idx}
            >
              <Icon name="bomb" /> RESET
            </Button>
          )
        } else {
          return (
            <Button
              onClick={() => this.usePowerUp(idx)}
              positive
              style={{
                width: '100px',
                margin: '10px 0 10px 0',
                backgroundColor: 'gold'
              }}
              disabled={
                !this.state.powerUps.length || this.state.disablePowerUps
              }
              key={idx}
            >
              <Icon name="exchange" /> SWAP
            </Button>
          )
        }
      })
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

export default connect(mapStateToProps, null)(PowerUp)
