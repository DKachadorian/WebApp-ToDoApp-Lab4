import React, { useState, useEffect } from "react";
import { useResource } from "react-request-hook";
import { StateContext } from "../context";

export default function Login({ dispatch }) {
  const [username, setUsername] = useState("");
  const [loginFailed, setLoginFailed] = useState(false);
  const [password, setPassword] = useState("");

  const [user, login] = useResource((username, password) => ({
    url: "auth/login",
    method: "post",
    data: { username, password },
  }));

  function handlePassword(evt) {
    setPassword(evt.target.value);
  }

  useEffect(() => {
    if (user && user.isLoading === false && (user.data || user.error)) {
      if (user.error) {
        setLoginFailed(true);
      } else {
        setLoginFailed(false);
        dispatch({
          type: "LOGIN",
          username: "User",
          access_token: user.data.access_token,
        });
      }
    }
  }, [user]);

  return (
    <>
      {loginFailed && (
        <span style={{ color: "red" }}>Invalid username or password</span>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          login(username, password);
          dispatch({ type: "LOGIN", username });
        }}
      >
        <label htmlFor="login-username">Username:</label>
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          name="login-username"
          id="login-username"
        />
        <label htmlFor="login-password">Password:</label>
        <input
          type="password"
          value={password}
          onChange={handlePassword}
          name="login-username"
          id="login-username"
        />
        <input type="submit" value="Login" disabled={username.length === 0} />
      </form>
    </>
  );
}
