"use client";
import AddTodo from "./components/add-todo";
import TaskCard from "./components/task-card";
import React from "react";
import { useState, useEffect } from "react";
import { getTodos, getUserByEmail } from "@/actions/todoActions";
import { useSession } from "next-auth/react";

const Page = () => {
  const { data: session, status } = useSession();
  const [isMounted, setIsMounted] = useState(false);
  const [userData, setUserData] = useState({ userID: "", todos: [] });
  const [responseTime, setResponseTime] = useState(null);

  const getTodo = async () => {
    if (!userData.userID) return;
    const startTime = performance.now();
    const data = await getTodos(userData.userID);
    const endTime = performance.now();
    setResponseTime(endTime - startTime);
    setUserData((prevData) => ({ ...prevData, todos: data }));
  };

  useEffect(() => {
    if (session) {
      const cachedEmail = localStorage.getItem("userEmail");
      const cachedUserID = localStorage.getItem("userID");

      if (cachedEmail === session.user.email && cachedUserID) {
        setUserData({ userID: cachedUserID, todos: [] });
      } else {
        const startTime = performance.now();
        getUserByEmail(session.user.email).then((data) => {
          const endTime = performance.now();
          setResponseTime(endTime - startTime);
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

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        getTodo();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [getTodo]);

  if (status === "unauthenticated") {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-1/3 min-w-72 h-36 bg-white rounded-md flex items-center justify-center">
          <span className="xl:text-2xl text-lg text-center font-medium text-black transition-all">
            Please Sign in to use todo app
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full px-6 py-2 flex flex-col gap-4 items-center">
      <div className="max-w-4xl w-full  h-full flex flex-col gap-4">
        <section className="p-4 w-full flex gap-4 h-auto bg-white/10 rounded-md flex-col transition-all">
          <p className="text-gray-400 bg-gray-800 px-2 py-1 rounded-md text-base w-fit">
            Response Time:{" "}
            <span className="font-medium text-red-400">{responseTime}</span> ms
          </p>
          <AddTodo userID={userData.userID} getTodo={getTodo} />
        </section>
        <ul className="w-full flex gap-4 h-3/4 bg-white/10 rounded-md overflow-y-auto p-4 flex-col transition-all">
          {userData.todos
            .sort((a, b) => a.done - b.done) // Sort tasks: incomplete first, completed last
            .map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                getTodo={getTodo}
                userID={userData.userID}
                setUserData={setUserData}
              />
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Page;
