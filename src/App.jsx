import React, { useEffect, useState } from "react";

function App() {
  const [inputText, setInputText] = useState("");

  const [todoInput, setTodoInput] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  // Save todos in LocalStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoInput));
  }, [todoInput]);

  function handleChange(event) {
    setInputText(event.target.value);
  }

  // Add task
  function handleClick() {
    if (inputText.trim() === "") return;

    setTodoInput((preValue) => {
      return [
        ...preValue,
        {
          id: Date.now(),
          text: inputText,
          completed: false,
        },
      ];
    });

    setInputText("");
  }

  // Complete task
  function handleComplete(id) {
    setTodoInput((preValue) => {
      return preValue.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            completed: !item.completed,
          };
        }

        return item;
      });
    });
  }

  // Delete task
  function handleDelete(id) {
    setTodoInput((preValue) => {
      return preValue.filter((item) => item.id !== id);
    });
  }

  // Edit task
  function handleEdit(id) {
    const newText = prompt("Edit your task:");

    if (newText && newText.trim() !== "") {
      setTodoInput((preValue) => {
        return preValue.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              text: newText,
            };
          }

          return item;
        });
      });
    }
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List 📝</h1>
      </div>

      <div className="form">
        <input
          type="text"
          placeholder="Write a task..."
          onChange={handleChange}
          value={inputText}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleClick();
            }
          }}
        />

        <button onClick={handleClick}>
          <span>Add</span>
        </button>
      </div>

      <p className="counter">
        {todoInput.filter((item) => !item.completed).length} tasks remaining 🌸
      </p>

      <div>
        <ul>
          {todoInput.map((item) => {
            return (
              <li
                key={item.id}
                className={item.completed ? "completed" : ""}
              >
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => handleComplete(item.id)}
                />

                <span className="task-text">{item.text}</span>

                <button
                  className="small-btn edit-btn"
                  onClick={() => handleEdit(item.id)}
                >
                  ✏️
                </button>

                <button
                  className="small-btn delete-btn"
                  onClick={() => handleDelete(item.id)}
                >
                  🗑️
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;