"use client";
import React, { useState } from "react";
import { addUser, addTodo, getUser, getTodo } from "@/actions/todoActions";

const TodoApp = () => {
  const [userName, setUserName] = useState("");
  const [todoText, setTodoText] = useState("");
  const [userId, setUserId] = useState(5);
  const [todos, setTodos] = useState([]);

  const handleAddUser = async () => {
    const user = await addUser(userName);
    console.log("user", user);
    setUserId(user[0].id);
    console.log("userId", userId);
  };

  const handleAddTodo = async () => {
    await addTodo(userId, todoText);
    const userTodos = await getTodo(userId);
    setTodos(userTodos);
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <input
          className="border-2 border-gray-300 text-black p-2 w-full"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter user name"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
          onClick={handleAddUser}
        >
          Add User
        </button>
      </div>
      <div className="mb-4">
        <input
          className="border-2 border-gray-300 p-2 text-black w-full"
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
          placeholder="Enter todo text"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
          onClick={handleAddTodo}
        >
          Add Todo
        </button>
        {/* fetch todo */}
        <button
          className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
          onClick={async () => {
            const userTodos = await getTodo(userId);
            setTodos(userTodos);
          }}
        >
          Fetch Todos
        </button>
      </div>
      <div>
        {/* USER ID */}
        {userId && <div className="mb-4 text-green-900">User ID: {userId}</div>}
        {/* USER TODOS */}
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="border-2 border-gray-300 text-black p-2 mb-2"
          >
            {todo.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoApp;
