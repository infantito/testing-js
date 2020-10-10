import React from 'react'

function Editor() {
  return (
    <form>
      <label htmlFor="title-input">Title</label>
      <input type="text" id="title-input" />

      <label htmlFor="content-input">Content</label>
      <textarea id="content-input" />

      <label htmlFor="tags-input">Tags</label>
      <input type="text" id="tags-input" />

      <button type="submit">Submit</button>
    </form>
  )
}

export {Editor}
