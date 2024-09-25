import React from "react";
export default function TodoItem(prop) {
  return (
    <ul className="list-group">
      {prop.todos.map((todo, index) => {
        return (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {todo}
            <span>
              <button type="button" className="btn btn-info me-2" onClick={()=>prop.moveUpTodo(index)}>
                up
              </button>
              <button type="button" className="btn btn-light me-2" onClick={()=>prop.moveDownTodo(index)}>
                down
              </button>
              <button
                type="button"
                className="btn btn-secondary  me-2"
                onClick={() => prop.editTodo(index)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => prop.deleteTodo(index)}
              >
                Delete
              </button>
            </span>
          </li>
        );
      })}
    </ul>
  );
}
