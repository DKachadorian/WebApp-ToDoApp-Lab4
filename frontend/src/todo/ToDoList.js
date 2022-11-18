import ToDos from "./ToDos";

export default function ToDoList({ toDos = [], onDelete }) {
  // how to implement the Toggle todo and delete todo !!!!!!!!!!
  return (
    <div>
      {toDos.map((t, i) => (
        <div>
          <ToDos {...t} key={t.id} onDelete={onDelete} />
        </div>
      ))}

      <div>
        {toDos.length === 0 && <h2>No posts found.</h2>}
        {toDos.length > 0 &&
          toDos.map((p, i) => <ToDos {...p} key={p._id || p.id} />)}
      </div>
    </div>
  );
}
