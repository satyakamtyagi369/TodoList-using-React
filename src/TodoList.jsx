import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './TodoList.css'; // Import the CSS file

export default function TodoList() {
  const [todos, setTodos] = useState([
    { task: "Sample Task", id: uuidv4(), bold: false, done: false }
  ]);
  const [newTodo, setNewTodo] = useState("");

  const addNewTodo = () => {
    if (newTodo.trim() === "") {
      alert("Task cannot be empty!");
      return;
    }

    setTodos((prevTodos) => [
      ...prevTodos,
      { task: newTodo.trim(), id: uuidv4(), bold: false, done: false }
    ]);
    setNewTodo("");
  };

  const addUpdateTodo = (event) => {
    setNewTodo(event.target.value);
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const upperCase = () => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => ({
        ...todo,
        task: todo.task.toUpperCase(),
        bold: true
      }))
    );
  };

  const editTask = (id) => {
    const updatedTask = prompt("Enter the updated task:");
    if (updatedTask && updatedTask.trim() !== "") {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, task: updatedTask.trim(), bold: false } : todo
        )
      );
    } else {
      alert("Task cannot be empty!");
    }
  };

  const upperCaseonlyonewithbold = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? { ...todo, task: todo.task.toUpperCase(), bold: true }
          : todo
      )
    );
  };

  const markAsDone = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  return (
    <div className="todo-container">
      <h1 className="todo-header">Todo List App</h1>
      <div className="input-container">
        <input
          className="todo-input"
          placeholder="Add a new Task"
          value={newTodo}
          onChange={addUpdateTodo}
        />
        <button className="todo-button add-button" onClick={addNewTodo}>
          Add Task
        </button>
      </div>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li className="todo-item" key={todo.id}>
            <span
              className={`todo-text ${
                todo.bold ? "bold-text" : ""
              } ${todo.done ? "done-text" : ""}`}
            >
              {todo.task}
            </span>
            &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
            <div className="button-group">
              <button className="todo-button delete-button" onClick={() => deleteTodo(todo.id)}>
                Delete
              </button>
              <button className="todo-button edit-button" onClick={() => editTask(todo.id)}>
                Edit
              </button>
              <button
                className="todo-button uppercase-button"
                onClick={() => upperCaseonlyonewithbold(todo.id)}
              >
                UpperCase
              </button>
              <button
                className="todo-button done-button"
                onClick={() => markAsDone(todo.id)}
              >
                {todo.done ? "Undo" : "Mark as Done"}
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button className="todo-button uppercase-all-button" onClick={upperCase}>
        Upper Case All
      </button>
    </div>
  );
}
