import ToDos from "./ToDos";

//Post getting passed into as a list into PostList
export default function ToDoList({ toDos = [] }) {
  return (
    <div>
      {toDos.map((p, i) => (
        <ToDos {...p} key={"post-" + i} />
      ))}
    </div>
  );
}
