import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, Redirect, Link } from 'react-router-dom'
import LoginPage from './components/LoginPage'
import HomePage from './components/HomePage'
import UsersPage from './components/UsersPage'
import User from './components/User'
import BlogView from './components/BlogView'
import Navbar from './components/Navbar'
import blogService from './services/blogs'
import { initialiseBlogs } from './reducers/blogReducer'
import { initialiseUsers } from './reducers/userReducer'
import './App.css'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initialiseBlogs())
    dispatch(initialiseUsers())
  }, [dispatch])

  const user = useSelector(state => state.login)

  useEffect(() => {
    if (user) {
      window.localStorage.setItem('loggedInBloglistUser', JSON.stringify(user))
      blogService.setToken(user.token)
    }
  }, [user])

  return (
    <>
      <Navbar />
      <main>
        <div className="app__container">
          <Link to="/" className="app__logo">
            Blog app
          </Link>
          <Switch>
            <Route path="/users/:id" component={User} />
            <Route path="/blogs/:id" component={BlogView} />
            <Route path="/login" exaxt component={LoginPage} />
            <Route path="/users" exaxt component={UsersPage} />
            <Route
              path="/"
              render={() => (user ? <HomePage /> : <Redirect to="/login" />)}
            />
          </Switch>
        </div>
      </main>
    </>
  )
}

export default App
