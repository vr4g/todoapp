import { useState } from "react";
import Style from "./todo.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";

const Todo = ({ task, onDelete, onEdit }) => {
  const [title, setText] = useState(task.title);
  const [showEditTask, setShowEditTask] = useState(false);

  const showHideEdit = () => {
    setText(task.title);
    setShowEditTask((current) => !current);
  };

  return (
    <div className={Style.todoStyle}>
      {showEditTask ? (
        <textarea
          type="textarea"
          className={`${(Style.taskText, Style.txtArea)}`}
          value={title}
          onChange={(e) => setText(e.target.value)}
        />
      ) : (
        <div className={Style.taskContainer}>
          <span className={Style.taskText}>{title}</span>
          <div>
            <span className={Style.categoryText}>{task.category_title}</span>
          </div>
        </div>
      )}

      <div className={Style.buttons}>
        {showEditTask ? (
          <>
            <CloseIcon onClick={showHideEdit} className={Style.deleteIcon} />
            <SaveIcon
              className={Style.editIcon}
              onClick={() => {
                onEdit(task.id, title);
                setShowEditTask((current) => !current);
              }}
            />
          </>
        ) : (
          <>
            <DeleteIcon
              onClick={() => onDelete(task.id)}
              className={Style.deleteIcon}
            />
            <EditIcon onClick={showHideEdit} className={Style.editIcon} />
          </>
        )}
      </div>
    </div>
  );
};

export default Todo;
