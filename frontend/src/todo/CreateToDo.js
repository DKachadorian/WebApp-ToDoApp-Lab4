import { useState, useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { StateContext } from "../context";
import { useResource } from "react-request-hook";

//export default function CreateToDo({ user, toDos, dispatch }) {
export default function CreateToDo() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [dateCreated, setDateCreated] = useState(Date());
  const [complete, setComplete] = useState(false);
  const [dateCompleted, setDateCompleted] = useState(Date());
  const [error, setError] = useState(false);

  const { state, dispatch } = useContext(StateContext);
  const { user } = state;

  const [post, createToDo] = useResource(
    ({
      title,
      content,
      description,
      dateCreated,
      complete,
      dateCompleted,
      author,
    }) => ({
      url: "/todos",
      method: "post",
      headers: { Authorization: `${state.user.access_token}` },
      data: {
        title,
        content,
        description,
        dateCreated,
        complete,
        dateCompleted,
        author,
      },
    })
  );

  useEffect(() => {
    if (post?.error) {
      setError(true);
      //alert(todo.data.error.code);
    }
  }, [post]);

  if (post?.isLoading === false && post?.data) {
    dispatch({
      type: "CREATE_TODO",
      title: post.data.title,
      content: post.data.content,
      author: user.username,
      complete: post.data.complete,
      dateCompleted: post.data.dateCompleted,
      dateCreated: post.data.dateCreated,
      id: post.data.id,
    });
  } else {
    return [post];
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createToDo({
          title,
          content,
          description,
          dateCreated,
          complete,
          dateCompleted,
          author: user,
        });
      }}
    >
      <div>
        Author: <b>{user.username}</b>
      </div>
      <div>
        <label htmlFor="create-title">Title:</label>
        <input
          type="text"
          name="create-title"
          id="create-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="create-description">Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="complete">Complete:</label>
        <input
          type="checkbox"
          checked={complete}
          onChange={(e) => setComplete(Date.now())}
        />
      </div>

      <textarea value={content} onChange={(e) => setContent(e.target.value)} />

      <input
        type="submit"
        value="Create"
        onChange={(event) =>
          setDateCreated(Date.now(), (e) => setDateCompleted(Date.now()))
        }
      />
    </form>
  );
}
