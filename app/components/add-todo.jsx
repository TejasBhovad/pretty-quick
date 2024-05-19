import React from "react";
import { addTodo } from "@/actions/todoActions";
const AddTodo = ({ userID, getTodo }) => {
  const [text, setText] = React.useState("");
  const handleAddTodo = async () => {
    if (text) {
      const data = await addTodo(userID, text);
      console.log("data", data);
      setText("");
      getTodo();
    }
  };
  return (
    <div className="w-fit h-fit bg-white text-black rounded-md px-6 py-4 flex gap-2 flex-col">
      <span className="font-semibold text-lg">Add Todo</span>
      <input
        className="w-full border border-gray-300 rounded-md px-2 py-1"
        type="text"
        placeholder="Enter Todo"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className="w-full bg-blue-500 text-white rounded-md px-2 py-1 mt-2"
        onClick={handleAddTodo}
      >
        Add Todo
      </button>
    </div>
  );
};

export default AddTodo;
