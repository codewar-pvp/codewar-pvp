import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {NavLink, withRouter} from 'react-router-dom'
import {logout, clearResult, clearError} from '../store'
import {
  Menu,
  Segment,
  Modal,
  Button,
  Header,
  Grid,
  Image
} from 'semantic-ui-react'

class Navbar extends React.Component {
  state = {activeItem: ''}
  handleItemClick = (e, {name}) => {
    this.props.clearResult()
    this.props.clearErrorMsg()
    this.setState({activeItem: name})
    if (name === 'logout') {
      this.props.handleClick()
    }
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
            }}
          >
            <Image
              src="/866455.png"
              size="mini"
              spaced="right"
              verticalAlign="middle"
            />
            <NavLink to="/questions">Code War PVP</NavLink>
          </h4>

          <Menu.Item
            as={NavLink}
            to="/questions"
            content="Home"
            name="home"
            onClick={this.handleItemClick}
            active={activeItem === 'home'}
            position="left"
            icon="home"
          />

          {this.props.challenger.id ? (
            <Modal
              basic
              centered
              trigger={
                <Button inverted color="red">
                  NEW CHALLENGE!
                </Button>
              }
            >
              <Modal.Content>
                <Grid container textAlign="center">
                  <Grid.Row>
                    <Header inverted as="h2" color="yellow">
                      {this.props.challenger.name} Wants to Challenge you!
                    </Header>
                  </Grid.Row>

                  <Grid.Row>
                    <Button inverted color="blue">
                      Accept
                    </Button>

                    <Button inverted color="red">
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
              <Menu.Item
                as="h4"
                content={`Welcome back ${this.props.user.name}!`}
                onClick={this.handleItemClick}
                name="user"
                icon="user circle"
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
    isLoggedIn: !!state.user.id,
    email: state.user.email,
    challenger: state.warReducer.challenge,
    user: state.user
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
    }
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
