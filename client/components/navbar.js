import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, NavLink, withRouter} from 'react-router-dom'
import {logout} from '../store'
import {Menu, Segment, Grid} from 'semantic-ui-react'

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
    console.log(this.state.activeItem)
    return (
      // <Grid>
      <Segment inverted>
        <Menu inverted pointing secondary>
          {/* <Menu.Header
          as='h4'
          content='Code War PVP'
        /> */}
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
            <Menu.Item
              as={NavLink}
              to="/home"
              content="Logout"
              onClick={this.handleItemClick}
              name="logout"
              active={activeItem === 'logout'}
            />
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
    isLoggedIn: !!state.user.id
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
