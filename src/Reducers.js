function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
    case "REGISTER":
      return action.username;
    case "LOGOUT":
      return "";
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
    default:
      return state;
  }
}

// add new reducer code here -- such as TOGGLE_TODO --  When user clicks the checkbox
function toggleToDoReducer(state, action) {
  switch (action.type) {
    case "TOGGLE":
      return state.filter((state) => state.id !== action.id);
    default:
      throw new Error();
  }
}

// add new reducer code here --- such as DELETE_TODO -- iterates over all the ToDos held in state to identify a todo for removal from state
function deleteToDoReducer(state, action) {
  switch (action.type) {
    case "DELETE_TODO":
      return state.filter((state) => state.id !== action.id);
    default:
      throw new Error();
  }
}

export default function appReducer(state, action) {
  return {
    user: userReducer(state.user, action),
    toDos: toDoReducer(state.toDos, action),
    //toggle: toggleToDoReducer(state.toggle, action),
    // delete: deleteToDoReducer(state.delete, action),
  };
}
