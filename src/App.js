import UserBar from "./user/UserBar";
import ToDoList from "./todo/ToDoList";
import CreateToDo from "./todo/CreateToDo";
import { useEffect, useReducer } from "react";
import appReducer from "./Reducers";

function App() {
  const initialToDos = [];

  const [state, dispatch] = useReducer(appReducer, {
    user: "",
    toDos: initialToDos,
  });

  const { user } = state;
  useEffect(() => {
    if (user) {
      document.title = `${user}’s ToDo Web App`;
    } else {
      document.title = "Web App";
    }
  }, [user]);

  return (
    <div>
      <UserBar user={state.user} dispatch={dispatch} />
      <br />
      <ToDoList toDos={state.toDos} dispatch={dispatch} />
      {state.user && (
        <CreateToDo user={state.user} toDos={state.toDos} dispatch={dispatch} />
      )}
    </div>
  );
}

export default App;
