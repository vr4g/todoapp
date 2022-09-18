import Todo from "./Todo";

const TodoList = ({ tasks, onDelete, onEdit }) => {
  return (
    <>
      <div className="card">
        {tasks.map((task) => (
          <Todo key={task.id} task={task} onDelete={onDelete} onEdit={onEdit} />
        ))}
      </div>
    </>
  );
};

export default TodoList;
