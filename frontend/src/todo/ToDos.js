export default function ToDos({
  title,
  description,
  content,
  author,
  complete,
  dateCreated,
  dateCompleted,
}) {
  return (
    <div>
      <p> Title : {title}</p>
      <p> Description : {description}</p>
      <p> Date Created : {dateCreated}</p>
      <p> Checked status : {complete ? "Yes" : "No"} </p>
      <p> Completed : {dateCompleted}</p>
      <p> Task that needs to get done : {content}</p>
      <p> Author : {author} </p>
      <br />
    </div>
  );
}
