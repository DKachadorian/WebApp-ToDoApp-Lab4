function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        username: action.username,
        access_token: action.access_token,
      };
    case "REGISTER":
      return action.username;
    case "LOGOUT":
      return null;
    default:
      return state;
  }
}

function toDoReducer(state, action) {
  switch (action.type) {
    case "CREATE_TODO":
      const newToDo = {
        title: action.title,
        content: action.content,
        author: action.user,
        description: action.description,
        dateCreated: action.dateCreated,
        complete: action.complete,
        dateCompleted: action.dateCompleted,
      };
      return [newToDo, ...state];

    case "FETCH_TODOS":
      return action.toDos;

    case "CLEAR_TODOS":
      return [];

    // add the toggle todo component
    case "TOGGLE_TODO":
      return state.map((item) => {
        if (item.id === action.id) {
          return {
            complete: item.complete,
            dateCompleted: item.dateCompleted,
          };
        } else {
          return item;
        }
      });

    // add the delete todo component
    case "DELETE_TODO":
      return state.filter((item) => item.id !== action.id);

    default:
      return state;
  }
}

export default function appReducer(state, action) {
  return {
    user: userReducer(state.user, action),
    toDos: toDoReducer(state.toDos, action),
  };
}
