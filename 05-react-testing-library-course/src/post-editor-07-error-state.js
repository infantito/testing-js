import React, {useState} from 'react'
import {Redirect} from 'react-router'
import {savePost} from './api'

function Editor({user}) {
  const [redirect, setRedirect] = useState(false)

  const [isSaving, setIsSaving] = useState(false)

  const [error, setError] = useState(null)

  const handleSubmit = e => {
    e.preventDefault()

    const {title, content, tags} = e.target.elements

    setIsSaving(true)

    const newPost = {
      title: title.value,
      content: content.value,
      date: new Date().toISOString(),
      tags: tags.value.split(',').map(value => value.trim()),
      userId: user.id,
    }

    savePost(newPost).then(
      () => setRedirect(true),
      response => {
        setIsSaving(false)

        setError(response.data.error)
      },
    )
  }

  if (redirect) {
    return <Redirect to="/" />
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title-input">Title</label>
      <input type="text" id="title-input" name="title" />

      <label htmlFor="content-input">Content</label>
      <textarea id="content-input" name="content" />

      <label htmlFor="tags-input">Tags</label>
      <input type="text" id="tags-input" name="tags" />

      <button type="submit" disabled={isSaving}>
        Submit
      </button>
      {error ? <div role="alert">{error}</div> : null}
    </form>
  )
}

export {Editor}
