import { useState, useEffect } from "react";
import Style from "./todo.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const Todo = ({ task, onDelete, onEdit }) => {
  const [title, setText] = useState(task.title);
  const [showEditTask, setShowEditTask] = useState(false);
  const [isChecked, setCheck] = useState(task.checked);

  const showHideEdit = () => {
    setText(task.title);
    setShowEditTask((current) => !current);
  };

  const updateCheck = async (id, check) => {
    const recordBodyParameters = {
      id: id,
      checked: check,
    };
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recordBodyParameters),
    };
    const response = await fetch("/task/check/:id", options);
    return response.json();
  };

  return (
    <div className={Style.todoStyle}>
      <div className={Style.check}>
        {isChecked ? (
          <CheckBoxIcon
            className={Style.checkbox}
            onClick={() => {
              setCheck((current) => !current);
              updateCheck(task.id, false);
            }}
          />
        ) : (
          <CheckBoxOutlineBlankIcon
            className={Style.checkbox}
            onClick={() => {
              setCheck((current) => !current);
              updateCheck(task.id, true);
            }}
          />
        )}
      </div>
      {showEditTask ? (
        <textarea
          type="textarea"
          className={`${(Style.taskText, Style.txtArea)}`}
          value={title}
          onChange={(e) => setText(e.target.value)}
        />
      ) : (
        <div
          className={
            isChecked ? Style.taskContainerChecked : Style.taskContainer
          }
        >
          {isChecked ? (
            <span className={Style.taskTextChecked}>{title}</span>
          ) : (
            <span className={Style.taskText}>{title}</span>
          )}

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
