import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import TodoItem from "./TodoItem.jsx";
import "./App.css";

export default function App() {
  const [todos, setTodos] = useState([]);
  function addTodo() {
    let userInput = document.getElementById("TodoInput").value.trim();
    if (userInput.length > 0) {
      document.getElementById("TodoInput").value = "";
      setTodos((prevTodos) => [...prevTodos, userInput]);
    }
  }
  function deleteTodoooo(index) {
    setTodos((prevTodos) => prevTodos.filter((_, i) => i !== index));
  }
  function editTodooo(index) {
    let newTodoInput = document.getElementById("TodoInput").value.trim();
    if (newTodoInput != "" && newTodoInput != " ") {
      setTodos((prevTodos) => {
        let updatedTodos = [...prevTodos];
        updatedTodos[index] = newTodoInput;
        return updatedTodos;
      });
      document.getElementById("TodoInput").value = "";
    }
  }
  function moveUpTodoooo(index) {
    if (index > 0) {
      setTodos((prevTodos) => {
        const updatedTodos = [...prevTodos];
        const temp = updatedTodos[index];
        updatedTodos[index] = updatedTodos[index - 1];
        updatedTodos[index - 1] = temp;
        return updatedTodos;
      });
    }
  }

  function moveDownTodoo(index) {
    if (index < todos.length - 1) {
      setTodos((prevTodos) => {
        const updatedTodos = [...prevTodos];
        const temp = updatedTodos[index];
        updatedTodos[index] = updatedTodos[index + 1];
        updatedTodos[index + 1] = temp;
        return updatedTodos;
      });
    }
  }

  return (
    <main className="container-fluid text-bg-secondary py-4">
      <h1 className="text-center">To-Do-List</h1>
      <div className="input-group my-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter a task"
          id="TodoInput"
        />
        <button className="btn btn-primary" type="button" onClick={addTodo}>
          Add
        </button>
      </div>
      <div className="container">
        <TodoItem
          todos={todos}
          editTodo={editTodooo}
          deleteTodo={deleteTodoooo}
          moveUpTodo={moveUpTodoooo}
          moveDownTodo={moveDownTodoo}
        />
      </div>
    </main>
  );
}
