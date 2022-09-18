import AddTodo from "./components/AddTodo";
import Header from "./components/Header";
import TodoList from "./components/TodoList";
import { useEffect, useState } from "react";

function App() {
  const addRecordEndpoint = "/postTask";
  const deleteRecordEndpoint = "/deleteTask";
  const updateRecordEndpoint = "/updateTask";

  const [tasks, setTasks] = useState([{}]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/tasks");
      if (!response.ok) {
        console.log("Cannot fetch");
      }

      const data = await response.json();
      setTasks(data);
    }

    fetchData();
  });

  const addTask = async (task) => {
    const recordBodyParameters = {
      title: task.title,
      category_id: task.category_id,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recordBodyParameters),
    };

    const response = await fetch(addRecordEndpoint, options);
    const jsonResponse = await response.json();
    console.log(JSON.stringify(jsonResponse));
    return jsonResponse;
  };

  /*   const addTodo = (task) => {
    const id = Math.floor(Math.random() * 1000) + 1;
    const newTask = { id, ...task };
    setTasks([...tasks, newTask]);
  }; */

  const deleteTask = async (id) => {
    if (!window.confirm("Da li ste sigurni?")) {
      return;
    }
    const options = {
      method: "DELETE",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    };

    const response = await fetch(deleteRecordEndpoint, options);
    const jsonResponse = await response.json();
    console.log(JSON.stringify(jsonResponse));
    return jsonResponse;
  };

  /*   const deleteTask = (id) => {
    if (!window.confirm("Da li ste sigurni?")) {
      return;
    }
    setTasks(tasks.filter((task) => task.id !== id));
  }; */

  const editTask = async (id, newText) => {
    const recordBodyParameters = {
      id: id,
      title: newText,
      category_id: 1,
    };

    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recordBodyParameters),
    };

    const response = await fetch(updateRecordEndpoint, options);
    const jsonResponse = await response.json();
    console.log(JSON.stringify(jsonResponse));
    return jsonResponse;
  };

  /*   const editTask = (id, newText) => {
    if (!newText) {
      alert("Unos ne smije biti prazan!");
      return;
    }
    setTasks(
      tasks.map((todo) => (todo.id === id ? { ...tasks, text: newText } : todo))
    );
  }; */

  return (
    <div className="App">
      <Header title="To Do List" />
      <div className="container">
        <div>
          <AddTodo onAdd={addTask} />
        </div>
        <TodoList tasks={tasks} onDelete={deleteTask} onEdit={editTask} />
      </div>
    </div>
  );
}

export default App;
