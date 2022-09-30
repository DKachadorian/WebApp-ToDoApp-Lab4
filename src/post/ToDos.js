export default function ToDos({
  title,
  description,
  content,
  author,
  dateCreated,
  complete,
  dateCompleted,
}) {
  return (
    <div>
      <h3> Title : {title}</h3>
      <div> Description : {description}</div>
      <div> Date Created : {dateCreated}</div>
      <div> Completed : {complete}</div>
      <div> Task that needs to get done : {content}</div>
      <div> Date Completed : {dateCompleted}</div>
      <div> Author : {author} </div>
      <br />
    </div>
  );
}
