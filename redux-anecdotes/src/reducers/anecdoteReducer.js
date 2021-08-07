import anecdoteService from './../services/anecdotes'

export const addVotes = (id) => {
  return async (dispatch) => {
    await anecdoteService.addVote(id)
    dispatch({
      type: 'ADD_VOTE',
      data: {
        id,
      },
    })
  }
  // return async (dispatch) => {
  //   const id = "good boy"
  //   dispatch({
  //   type: 'ADD_VOTE',
  //   data: {
  //     id,
  //   })
  // }
}

export const addNew = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    console.log(newAnecdote)
    dispatch({
      type: 'NEW_ANEC',
      data: newAnecdote,
    })
  }
}

export const initalizeAnecdote = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({ type: 'INIT_ANEC', data: anecdotes })
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_VOTE':
      const id = action.data.id
      return state.map((anecdote) => {
        if (anecdote.id === id)
          return {
            ...anecdote,
            votes: anecdote.votes + 1,
          }
        return anecdote
      })
    case 'NEW_ANEC':
      console.log(action.data)
      return [...state, action.data]
    case 'INIT_ANEC':
      return action.data
    default:
      return state
  }
}

export default reducer
