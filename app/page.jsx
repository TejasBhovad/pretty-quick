"use client";
import React, { useEffect, useState } from "react";
import { getData } from "@/actions/todoActions";

const Page = () => {
  const [data, setData] = useState([]);
  const [loadingTime, setLoadingTime] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    const startTime = new Date();
    const response = await getData();
    setData(response);
    const endTime = new Date();
    setLoadingTime(endTime - startTime);
    setIsLoading(false);
  };

  return (
    <div className="w-full h-full bg-gray-800">
      Page
      <button className="bg-blue-400 px-3 py-1 rounded-md" onClick={fetchData}>
        Fetch Data
      </button>
      {loadingTime && <p>Loading time: {loadingTime} ms</p>}
      {isLoading && <p>Loading...</p>}
      {!isLoading && data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
};

export default Page;
