import React, {useState} from 'react'

function Editor() {
  const [isSaving, setIsSaving] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()

    setIsSaving(true)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title-input">Title</label>
      <input type="text" id="title-input" />

      <label htmlFor="content-input">Content</label>
      <textarea id="content-input" />

      <label htmlFor="tags-input">Tags</label>
      <input type="text" id="tags-input" />

      <button type="submit" disabled={isSaving}>
        Submit
      </button>
    </form>
  )
}

export {Editor}
