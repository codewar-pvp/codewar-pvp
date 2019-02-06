import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {NavLink, withRouter} from 'react-router-dom'
import {logout, clearResult, clearError, fetchAllQuestions} from '../store'
import {
  Menu,
  Segment,
  Modal,
  Button,
  Header,
  Grid,
  Image
} from 'semantic-ui-react'
import socket from '../socket'
import {gotChallenge, changeStatus, clearChallenge} from '../store/warReducer'
import history from '../history'

class Navbar extends React.Component {
  constructor() {
    super()
    this.state = {activeItem: '', showModal: false}
    this.handleAcceptChallenge = this.handleAcceptChallenge.bind(this)
    this.handleItemClick = this.handleItemClick.bind(this)
    this.handleDeclineChallenge = this.handleDeclineChallenge.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  handleItemClick = (e, {name}) => {
    this.props.clearResult()
    this.props.clearErrorMsg()
    this.props.fetchAllQuestions()
    this.setState({activeItem: name})
    if (name === 'logout') {
      this.props.handleClick()
    }
  }

  handleAcceptChallenge() {
    // attach name of challenger to user object to refer to room
    const userObject = this.props.user
    userObject.challenger = this.props.challenger
    socket.emit('acceptChallenge', userObject)
    this.props.changeStatus(false, true, false)
    this.props.history.push(`/challenges/${this.props.challenger.question}`)
  }

  handleDeclineChallenge() {
    this.props.resetChallenge()
    this.closeModal()
  }

  closeModal() {
    this.setState({showModal: false})
  }

  render() {
    const {isLoggedIn} = this.props
    const {activeItem} = this.state
    return (
      <Segment inverted>
        <Menu inverted pointing secondary style={{paddingBottom: '10px'}}>
          <h4
            id="pageHeader"
            onClick={() => {
              this.props.clearResult()
              this.props.fetchAllQuestions()
            }}
          >

          <Grid.Row verticalAlign="middle" textAlign="center">
            <Image
              src='./star.png'
              size="mini"
              spaced="right"
              verticalAlign="middle"
            />
            <NavLink to="/questions"><span>StreetByter</span></NavLink>
            <Image
              src='./star.png'
              size="mini"
              spaced="right"
              verticalAlign="middle"
            />
            </Grid.Row>

          </h4>

          {/* <Menu.Item
            as={NavLink}
            to="/questions"
            content="Home"
            name="home"
            onClick={this.handleItemClick}
            active={activeItem === 'home'}
            position="left"
            icon="home"
          /> */}

          {this.props.challengeStatus ? (
            <Modal
              basic
              centered
              trigger={
                <Button
                  onClick={() => this.setState({showModal: true})}
                  inverted
                  color="red"
                >
                  NEW CHALLENGE!
                </Button>
              }
              open={this.state.showModal}
              onClose={this.closeModal}
            >
              <Modal.Content>
                <Grid container textAlign="center">
                  <Grid.Row>
                    <Header inverted as="h2" color="yellow">
                      {this.props.challenger.name} Wants to Challenge you!
                    </Header>
                  </Grid.Row>

                  <Grid.Row>
                    <Button
                      inverted
                      color="blue"
                      onClick={this.handleAcceptChallenge}
                    >
                      Accept
                    </Button>

                    <Button
                      inverted
                      color="red"
                      onClick={this.handleDeclineChallenge}
                    >
                      Decline
                    </Button>
                  </Grid.Row>
                </Grid>
              </Modal.Content>
            </Modal>
          ) : (
            ''
          )}

          {isLoggedIn ? (
            <Menu.Menu position="right">
              <Image
                src={this.props.user.imageURL}
                spaced="right"
                verticalAlign="middle"
                avatar
                wrapped
                style={{marginTop: "10px"}}
              />
              <Menu.Item
                as="h4"
                content={this.props.user.name}
                onClick={this.handleItemClick}
                name="user"

              />
              <Menu.Item
                as={NavLink}
                to="/questions"
                content="Logout"
                onClick={this.handleItemClick}
                name="logout"
                icon="log out"
                active={activeItem === 'logout'}
              />
            </Menu.Menu>
          ) : (
            <Menu.Menu position="right">
              <Menu.Item
                as={NavLink}
                to="/login"
                content="Login"
                name="login"
                onClick={this.handleItemClick}
                active={activeItem === 'login'}
                position="right"
                icon="user"
              />
              <Menu.Item
                as={NavLink}
                to="/signup"
                content="Sign Up"
                name="signup"
                onClick={this.handleItemClick}
                active={activeItem === 'signup'}
                position="right"
                icon="signup"
              />
            </Menu.Menu>
          )}
        </Menu>
      </Segment>
    )
  }
}
/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.userReducer.user.id,
    email: state.userReducer.user.email,
    challenger: state.warReducer.challenge,
    user: state.userReducer.user,
    challengeStatus: state.warReducer.challengeStatus
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    },
    clearResult() {
      dispatch(clearResult())
    },
    clearErrorMsg() {
      dispatch(clearError())
    },
    changeStatus(challengeStatus, fightStatus, gameStatus) {
      dispatch(changeStatus(challengeStatus, fightStatus, gameStatus))
    },
    resetChallenge() {
      dispatch(clearChallenge())
    },
    fetchAllQuestions: () => dispatch(fetchAllQuestions())
  }
}

export default withRouter(connect(mapState, mapDispatch)(Navbar))

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
