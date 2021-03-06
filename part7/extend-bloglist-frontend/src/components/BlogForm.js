import React, { useState } from 'react'
import PropTypes from 'prop-types'
import InputField from './InputField'
import Button from './Button'
import styles from './BlogForm.module.css'

const BlogForm = ({ createBlog }) => {
  const [inputValue, setInputValue] = useState({ author: '', title: '', url: '' })

  const handleInputChange = event => {
    const target = event.target
    const value = target.value
    const name = target.name

    setInputValue(prevValues => {
      return {
        ...prevValues,
        [name]: value,
      }
    })
  }

  const handleCreateBlog = event => {
    event.preventDefault()
    try {
      const { title, author, url } = inputValue
      const blog = {
        title,
        author,
        url,
        likes: 0,
      }
      createBlog(blog)
      setInputValue({ author: '', title: '', url: '' })
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <form onSubmit={handleCreateBlog}>
      <InputField
        type="text"
        name="title"
        label="title"
        htmlFor="title"
        value={inputValue.title}
        onChange={handleInputChange}
      />
      <InputField
        type="text"
        name="author"
        label="author"
        htmlFor="author"
        value={inputValue.author}
        onChange={handleInputChange}
      />
      <InputField
        type="text"
        name="url"
        label="url"
        htmlFor="url"
        value={inputValue.url}
        onChange={handleInputChange}
      />
      <Button className={styles.createBtn} type="submit">
        Create
      </Button>
    </form>
  )
}

export default BlogForm

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}
