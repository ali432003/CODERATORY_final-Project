"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import useSocketActivity from "@/hooks/UserSocketActivity";
import BASE_URL from "@/utils/config";
import withAuth from "@/components/withAuth";

const Employee = () => {
  const [error, setError] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(localStorage.getItem("token"));
  useSocketActivity(user._id);
  const router = useRouter();
  const handleLogout = async () => {
    try {
      console.log(user.token);
      const res = await fetch(`${BASE_URL}/auth/logout/${user._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.ok) {
        const text = await res.text(); // Get the raw response text for debugging
        console.log("Response Text:", text);

        const data = JSON.parse(text); // Parse the JSON manually
        console.log("Parsed Data:", data.data);

        if (data) {
          // Store user data (could use sessionStorage, localStorage, or a global state)
          localStorage.clear();
          router.push("/auth/login");
        } else {
          setError(data.message || "Logout failed");
        }
      } else {
        setError("Login failed");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="flex py-2 justify-end pe-3 bg-blue-500">
        <button
          onClick={() => handleLogout()}
          className="bg-violet-500 hover:bg-violet-600 active:bg-violet-700 p-2 text-white rounded-full focus:outline-none focus:ring focus:ring-violet-300 ..."
        >
          Signout
        </button>
      </div>
      <div className="flex justify-center items-center min-h-screen bg-blue-500 text-white">
        <div className="flex flex-col ">
          <h1 className="text-[2rem]">
            Welcome <span className="font-bold">{user.username}</span>
          </h1>
          <button
            onClick={() => router.push("/employee/yourtask")}
            className="bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 ..."
          >
            Go To My Tasks
          </button>
        </div>
      </div>
    </>
  );
};

export default withAuth(Employee);
