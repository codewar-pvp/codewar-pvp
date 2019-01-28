import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {NavLink, withRouter} from 'react-router-dom'
import {logout} from '../store'
import {Menu, Segment} from 'semantic-ui-react'

class Navbar extends React.Component {
  state = {activeItem: ''}
  handleItemClick = (e, {name}) => {
    this.setState({activeItem: name})
    if (name === 'logout') {
      this.props.handleClick()
    }
  }

  render() {
    const {isLoggedIn} = this.props
    const {activeItem} = this.state
    return (
      // <Grid>
      <Segment inverted>
        <Menu inverted pointing secondary>
          <h4 id="pageHeader">
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
          {isLoggedIn ? (
            <Menu.Menu position="right">
              <Menu.Item
                as="h4"
                content={`Welcome back ${this.props.email}!`}
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
    email: state.user.email
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
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
