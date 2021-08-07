import React from 'react'
import { useDispatch } from 'react-redux'
import { addNew } from './../reducers/anecdoteReducer'
import { createMessage } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const addAnecdote = async (e) => {
    e.preventDefault()
    const content = e.target.create.value
    e.target.create.value = ''
    dispatch(addNew(content))
    dispatch(createMessage(`new anecdote ${content}`, 5))
  }

  const dispatch = useDispatch()
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name='create' />
        </div>
        <button>create</button>
      </form>
    </>
  )
}
export default AnecdoteForm
