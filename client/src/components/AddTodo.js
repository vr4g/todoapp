import { useState } from "react";
import Style from "./addtodo.module.css";
import AddBoxTwoToneIcon from "@mui/icons-material/AddBoxTwoTone";
import Button from "./Button";

const AddTodo = ({ onAdd, filterTasks, fetchAll }) => {
  const [title, setText] = useState("");
  const [category_id, setCategory] = useState("0");

  const onSubmit = (e) => {
    e.preventDefault();

    if (!title) {
      alert("Unos nesmije biti prazan!");
      return;
    }
    if (category_id === "0") {
      alert("Odaberi kategoriju!");
      return;
    }

    onAdd({ title, category_id });
    setText("");
    setCategory("0");
  };

  return (
    <div>
      <form onSubmit={onSubmit} className={Style.formBt}>
        <input
          type="text"
          placeholder="Unesi naziv ( npr. Kupi kruh )"
          value={title}
          onChange={(e) => setText(e.target.value)}
          className={Style.formInput}
        ></input>
        <select
          value={category_id}
          className={Style.dropdown}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="0">Kategorija</option>
          <option value="1">Posao</option>
          <option value="2">Zdravlje</option>
          <option value="3">Zabava</option>
          <option value="4">Sport</option>
          <option value="5">Ostalo</option>
        </select>
        <AddBoxTwoToneIcon onClick={onSubmit} className={Style.addButton} />
      </form>
      <div className={Style.filterBtns}>
        <h3>Filtriraj:</h3>
        <Button text="Sve" onClick={fetchAll} />
        <Button text="Posao" onClick={() => filterTasks(1)} />
        <Button text="Zdravlje" onClick={() => filterTasks(2)} />
        <Button text="Zabava" onClick={() => filterTasks(3)} />
        <Button text="Sport" onClick={() => filterTasks(4)} />
        <Button text="Ostalo" onClick={() => filterTasks(5)} />
      </div>
    </div>
  );
};

export default AddTodo;
