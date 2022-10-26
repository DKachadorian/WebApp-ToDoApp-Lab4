import React, { useState, useEffect } from "react";
import { useResource } from "react-request-hook";
import { StateContext } from "../context";

export default function Login({ dispatch }) {
  const [username, setUsername] = useState("");
  const [loginFailed, setLoginFailed] = useState(false);
  const [password, setPassword] = useState("");

  const [user, login] = useResource((username, password) => ({
    url: "/login",
    method: "post",
    data: { username, password },
  }));

  function handlePassword(evt) {
    setPassword(evt.target.value);
  }

  useEffect(() => {
    if (user) {
      if (user?.data?.user) {
        setLoginFailed(false);
      } else {
        setLoginFailed(true);
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
