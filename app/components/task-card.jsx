import React from "react";
import Image from "next/image";
import { deleteTodo, updateTodo } from "@/actions/todoActions";
const TaskCard = ({
  task: { id, text, done },
  getTodo,
  userID,
  setUserData,
}) => {
  const handleUpdateTodo = async (id, done) => {
    try {
      const startTime = performance.now();
      setUserData((prevData) => ({
        ...prevData,
        todos: prevData.todos.map((todo) =>
          todo.id === id ? { ...todo, done: done } : todo
        ),
      }));

      const data = await updateTodo(userID, id, done);
      const endTime = performance.now();
      console.log("Update data", data);
      console.log(`Time taken to update todo: ${endTime - startTime} ms`);
    } catch (error) {
      console.error("Error updating todo:", error);
      // if error, revert back to previous state
      getTodo();
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      const startTime = performance.now();
      const data = await deleteTodo(id);
      const endTime = performance.now();
      console.log("Delete data", data);
      console.log(`Time taken to delete todo: ${endTime - startTime} ms`);
      getTodo();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <li className="w-fit h-fit bg-white text-black rounded-md px-6 py-2 flex gap-2 flex-col">
      <span className="font-semibold text-lg">{text}</span>
      <div className="flex gap-2">
        <button
          className={`${
            done ? "bg-green-500" : "bg-blue-500"
          } text-white rounded-md p-1`}
          onClick={async () => handleUpdateTodo(id, !done)}
        >
          {done ? (
            <Image
              src="/tick.svg"
              alt="check"
              className="p-1 text-white"
              width={20}
              height={20}
            />
          ) : (
            <div className="h-[20px] aspect-square"></div>
          )}
        </button>
        <button
          className="bg-red-500 text-white rounded-md px-2 py-1"
          onClick={async () => handleDeleteTodo(id)}
        >
          <Image
            src="/delete.svg"
            alt="delete"
            className="p-1 text-white"
            width={20}
            height={20}
          />
        </button>
      </div>
    </li>
  );
};

export default TaskCard;
