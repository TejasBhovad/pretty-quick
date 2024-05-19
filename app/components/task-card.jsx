import React from "react";
import Image from "next/image";
import { deleteTodo, updateTodo } from "@/actions/todoActions";
const TaskCard = ({ task: { id, text, done }, getTodo }) => {
  return (
    <li className="w-fit h-fit bg-white text-black rounded-md px-4 py-2 flex gap-2 flex-col">
      <span className="font-semibold text-lg">{text}</span>
      <div className="flex gap-2">
        <button
          className={`${
            done ? "bg-green-500" : "bg-blue-500"
          } text-white rounded-md  p-1`}
          onClick={async () => {
            const data = await updateTodo(id, !done);
            console.log("data", data);
            getTodo();
          }}
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
          onClick={async () => {
            const data = await deleteTodo(id);
            console.log("data", data);
            getTodo();
          }}
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
