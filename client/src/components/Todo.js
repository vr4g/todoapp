import Button from "./Button";
import { useState } from "react";

const Todo = ({ task, onDelete, onEdit }) => {
  const [title, setText] = useState(task.title);
  const [showEditTask, setShowEditTask] = useState(false);

  const showHideEdit = () => {
    setShowEditTask((current) => !current);
  };

  return (
    <div className="todo-style">
      {showEditTask ? (
        <textarea
          type="textarea"
          className="edit-input task-text"
          value={title}
          onChange={(e) => setText(e.target.value)}
        />
      ) : (
        <div className="task-container">
          <span className="task-text">{task.title}</span>
          <div>
            <span className="category-text">{task.category_title}</span>
          </div>
        </div>
      )}

      <div className="buttons">
        {showEditTask ? (
          <>
            <Button
              text="Zatvori"
              cssStyle="delete-btn btn"
              onClick={showHideEdit}
            />
            <Button
              text="Spremi"
              cssStyle="btn"
              onClick={() => {
                onEdit(task.id, title);
                setShowEditTask((current) => !current);
              }}
            />
          </>
        ) : (
          <>
            <Button
              text="Obriši"
              cssStyle="delete-btn btn"
              onClick={() => onDelete(task.id)}
            />
            <Button text="Uredi" cssStyle="btn" onClick={showHideEdit} />
          </>
        )}
      </div>
    </div>
  );
};

export default Todo;
