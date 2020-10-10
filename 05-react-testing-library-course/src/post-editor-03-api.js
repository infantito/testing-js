import React, {useState} from 'react'
import {savePost} from './api'

function Editor({user}) {
  const [isSaving, setIsSaving] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()

    const {title, content, tags} = e.target.elements

    setIsSaving(true)

    savePost({
      title: title.value,
      content: content.value,
      tags: tags.value.split(',').map(value => value.trim()),
      userId: user.id,
    })
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
    </form>
  )
}

export {Editor}
