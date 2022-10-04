import AddTodo from "./components/AddTodo";
import Header from "./components/Header";
import TodoList from "./components/TodoList";
import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([{}]);
  const [isLoading, setIsLoading] = useState(true);
  const [triggerRefresh, setTriggerRefresh] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  async function fetchData() {
    const response = await fetch("/task");
    if (!response.ok) {
      console.log("Cannot fetch");
    }

    const data = await response.json();
    setTasks(data);
  }

  useEffect(() => {
    fetchData();
  }, [triggerRefresh]);

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
    setTriggerRefresh((current) => !current);

    const response = await fetch("/task", options);
    const jsonResponse = await response.json();

    return jsonResponse;
  };

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

    const response = await fetch("/task/:id", options);
    const jsonResponse = await response.json();
    setTriggerRefresh((current) => !current);
    return jsonResponse;
  };

  const editTask = async (id, newText) => {
    const recordBodyParameters = {
      id: id,
      title: newText,
    };
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recordBodyParameters),
    };
    const response = await fetch("/task/:id", options);
    return response.json();
  };

  const filterTasks = async (category_id) => {
    category_id === 0 && fetchData();
    const response = await fetch(
      `http://localhost:5000/task/filter?category_id=${category_id}`
    );
    if (!response.ok) {
      console.log("Cannot fetch");
    }
    const data = await response.json();
    setTasks(data);
  };

  return isLoading ? (
    <div className="splash-screen">
      <h1 className="main-text">To-Do APP</h1>
      <span className="leading-text">made by Damjan Petričević</span>
    </div>
  ) : (
    <div className="App">
      <Header title="My custom to-do list" />
      <div className="container">
        <div>
          <AddTodo
            onAdd={addTask}
            fetchAll={() => {
              fetchData();
            }}
            filterTasks={filterTasks}
          />
        </div>
        <TodoList tasks={tasks} onDelete={deleteTask} onEdit={editTask} />
      </div>
    </div>
  );
}

export default App;
