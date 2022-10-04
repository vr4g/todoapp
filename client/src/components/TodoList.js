import Todo from "./Todo";
import Style from "./todolist.module.css";

const TodoList = ({ tasks, onDelete, onEdit }) => {
  return (
    <>
      <div className={Style.card}>
        {tasks.map((task) => (
          <Todo key={task.id} task={task} onDelete={onDelete} onEdit={onEdit} />
        ))}
      </div>
    </>
  );
};

export default TodoList;
