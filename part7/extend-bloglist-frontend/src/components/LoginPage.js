import React from 'react'
import LoginForm from './LoginForm'
import Notification from './Notification'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { login } from '../reducers/loginReducer'
import { useHistory } from 'react-router-dom'

const LoginPage = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogin = async (username, password) => {
    if (!username || username === '' || !password || password === '') {
      dispatch(
        setNotification({ error: 'Please fill in username and password' }, 5),
      )
      return
    }

    try {
      await dispatch(login(username, password))
      history.push('/')

      dispatch(
        setNotification({
          notification: `${username} succesfully logged in`,
        }, 5),
      )
    } catch (err) {
      dispatch(
        setNotification({
          error: 'wrong username or password',
        }, 5),
      )
    }
  }
  return (
    <>
      <h2>Login to application</h2>
      <Notification />
      <LoginForm handleLogin={handleLogin} />
    </>
  )
}

export default LoginPage
