import UserBar from "./user/UserBar";
import ToDoList from "./todo/ToDoList";
import CreateToDo from "./todo/CreateToDo";
import { useState, useEffect, useReducer } from "react";
import appReducer from "./Reducers";
import { ThemeContext, StateContext } from "./context";
import Header from "./Header";
import ChangeTheme from "./ChangeTheme";
import { useResource } from "react-request-hook";

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

  const [theme, setTheme] = useState({
    primaryColor: "deepskyblue",
    secondaryColor: "coral",
  });

  const [toDos, getToDos] = useResource(() => ({
    url: "/todos",
    method: "get",
    headers: { Authorization: `${state.user.access_token}` },
  }));

  useEffect(() => {
    getToDos();
  }, [state?.user?.access_token]);

  useEffect(() => {
    if (toDos && toDos.isLoading === false && toDos.data) {
      dispatch({ type: "FETCH_TODOS", todos: toDos.data.reverse() });
    }
  }, [toDos]);

  return (
    <div>
      <StateContext.Provider value={{ state, dispatch }}>
        <ThemeContext.Provider value={theme}>
          <Header title="To Dos" />
          <ChangeTheme theme={theme} setTheme={setTheme} />

          <UserBar user={state.user} dispatch={dispatch} />
          <br />
          <ToDoList toDos={state.toDos} dispatch={dispatch} />
          {state.user && (
            <CreateToDo
              user={state.user}
              toDos={state.toDos}
              dispatch={dispatch}
            />
          )}
        </ThemeContext.Provider>
      </StateContext.Provider>
    </div>
  );
}

export default App;
