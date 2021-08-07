import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVotes } from './../reducers/anecdoteReducer'
import { createMessage } from './../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdoteMapping = (anecdotes) => {
    return anecdotes
      .sort((a1, a2) => a1.votes - a2.votes)
      .map((anecdote) => {
        return (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        )
      })
  }
  const { anecdotes, filter } = useSelector((state) => state)
  const dispatch = useDispatch()
  const vote = (anecdote) => {
    dispatch(addVotes(anecdote.id))
    dispatch(createMessage(anecdote.content, 5))
  }
  return (
    <>
      {filter
        ? anecdoteMapping(
            anecdotes.filter((anecdote) => {
              return anecdote.content.slice().toLowerCase().includes(filter)
            })
          )
        : anecdoteMapping(anecdotes)}
    </>
  )
}
export default AnecdoteList
