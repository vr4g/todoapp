import { useState } from "react";

const AddTodo = ({ onAdd }) => {
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
    <div className="input-container">
      <form onSubmit={onSubmit} className="form-bt">
        <input
          type="text"
          placeholder="Unesi naziv ( npr. Kupi kruh )"
          value={title}
          onChange={(e) => setText(e.target.value)}
          className="form-input"
        ></input>
        <select
          value={category_id}
          className="dropdown-style"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="0">Kategorija</option>
          <option value="1">Posao</option>
          <option value="2">Zdravlje</option>
          <option value="3">Zabava</option>
          <option value="4">Sport</option>
          <option value="5">Ostalo</option>
        </select>
        <input type="submit" value="Dodaj" className="btn"></input>
      </form>
    </div>
  );
};

export default AddTodo;
