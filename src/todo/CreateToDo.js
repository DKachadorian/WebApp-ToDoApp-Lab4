import { useState } from "react";

export default function CreateToDo({ user, toDos, setToDos }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [dateCreated, setDateCreated] = useState(Date());
  const [complete, setComplete] = useState(false);
  const [dateCompleted, setDateCompleted] = useState(Date());

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const newToDo = {
          title,
          content,
          author: user,
          description,
          dateCreated,
          complete,
          dateCompleted,
        };

        setToDos([newToDo, ...toDos]);
      }}
    >
      <div>
        Author: <b>{user}</b>
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
