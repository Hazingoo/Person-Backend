const initialState = null

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_MESSAGE':
      return action.data.content
    case 'DEFAULT':
      return initialState
    default:
      return state
  }
}

export const createMessage = (content, timeout) => {
  return async (dispatch) => {
    setTimeout(() => {
      dispatch({
        type: 'DEFAULT',
      })
    }, timeout * 1000)
    dispatch({
      type: 'CREATE_MESSAGE',
      data: {
        content,
      },
    })
  }
}

export default notificationReducer
