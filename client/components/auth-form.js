import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {login, signup, clearResult, clearError} from '../store'
import {NavLink, withRouter} from 'react-router-dom'
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Icon
} from 'semantic-ui-react'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props
  return (
    <div className="login-form">
      <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}</style>
      <Grid textAlign="center" style={{height: '100%'}} verticalAlign="middle">
        <Grid.Column style={{maxWidth: 450}}>
          <Header as="h2" color="teal" textAlign="center">
            <Icon name="compass outline" loading /> {displayName} your account
          </Header>
          <Form size="large" onSubmit={handleSubmit} name={name}>
            <Segment stacked>
              {name === 'signup' ? (
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Username"
                  name="userName"
                />
              ) : (
                ''
              )}
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="E-mail address"
                name="email"
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                name="password"
              />
              <Button color="teal" fluid size="large" type="submit">
                {displayName}
              </Button>
              {error &&
                error.response && <div id="error">{error.response.data}</div>}
            </Segment>
          </Form>
          <Message
            onClick={() => {
              props.clearResult()
              props.clearErrorMsg()
            }}
          >
            {displayName === 'Login' ? (
              <p>
                New to us ? <NavLink to="/signup"> Sign Up</NavLink>
              </p>
            ) : (
              <p>
                Already have a account?
                <NavLink to="/login"> Log In</NavLink>
              </p>
            )}
          </Message>
        </Grid.Column>
      </Grid>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.userReducer.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.userReducer.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()

      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      if (formName === 'login') {
        dispatch(login(email, password, formName))
      } else {
        const userName = evt.target.userName.value
        dispatch(signup(userName, email, password, formName))
      }
    },
    clearResult() {
      dispatch(clearResult())
    },
    clearErrorMsg() {
      dispatch(clearError())
    }
  }
}

export const Login = withRouter(connect(mapLogin, mapDispatch)(AuthForm))
export const Signup = withRouter(connect(mapSignup, mapDispatch)(AuthForm))

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
