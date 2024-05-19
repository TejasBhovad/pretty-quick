"use client";
import AddTodo from "./components/add-todo";
import TaskCard from "./components/task-card";
import React from "react";
import { useState, useEffect } from "react";
import { getTodos, getUserByEmail } from "@/actions/todoActions";

import { useSession } from "next-auth/react";

const page = () => {
  const { data: session, status } = useSession();
  const [isMounted, setIsMounted] = useState(false);
  const [userData, setUserData] = useState({ userID: "", todos: [] });

  const getTodo = async () => {
    if (!userData.userID) return;
    const data = await getTodos(userData.userID);
    setUserData((prevData) => ({ ...prevData, todos: data }));
  };

  useEffect(() => {
    if (session) {
      const cachedEmail = localStorage.getItem("userEmail");
      const cachedUserID = localStorage.getItem("userID");

      if (cachedEmail === session.user.email && cachedUserID) {
        setUserData({ userID: cachedUserID, todos: [] });
      } else {
        getUserByEmail(session.user.email).then((data) => {
          const newUserID = data[0].id;
          setUserData({ userID: newUserID, todos: [] });
          localStorage.setItem("userEmail", session.user.email);
          localStorage.setItem("userID", newUserID);
        });
      }
    }
  }, [session]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (userData.userID) {
      getTodo();
    }
  }, [userData.userID, isMounted]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full h-full px-6 py-2 flex flex-col gap-4">
      <p>{userData.userID}</p>
      <AddTodo userID={userData.userID} getTodo={getTodo} />
      <ul className="w-full flex-wrap flex gap-4">
        {userData.todos.map((task) => (
          <TaskCard key={task.id} task={task} getTodo={getTodo} />
        ))}
      </ul>
    </div>
  );
};

export default page;
