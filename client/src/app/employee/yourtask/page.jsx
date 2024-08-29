"use client";

import { useState, useEffect } from "react";
import { CardWithForm } from "@/components/Card";
import { CardDemo } from "@/components/PreviewCard";
import BASE_URL from "@/utils/config";
import React from "react";
import { CloudFog } from "lucide-react";
import useSocketActivity from "@/hooks/UserSocketActivity.js";
import withAuth from "@/components/withAuth";

const Page = () => {
  const [tasks, setTasks] = useState([]);
  
  const id = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))._id
  : null;
  
  useSocketActivity(id)
  const getTask = async () => {
    try {
      const resp = await fetch(`${BASE_URL}/employee/gettask/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (resp.ok) {
        const data = await resp.json();
        setTasks(data.data);
      } else {
        console.log("Failed to fetch task", resp.statusText);
      }
    } catch (error) {
      console.log("Error fetching task:", error);
    }
  };

  useEffect(() => {
    if (id) {
      getTask();
    } else {
      console.log("No user ID found");
    }
  }, [id]);

  // Add a new task to the state
  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  // Remove a task from the state
  const removeTask = (taskId) => {
    setTasks(tasks.filter((task) => task._id !== taskId));
  };

   // Function to update the task in the list
   const updateTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === updatedTask._id ? updatedTask : task
      )
    );
  };

  return (
    <div>
      <div className="flex justify-center items-center py-2 bg-blue-400">
        <CardWithForm addTask={addTask} />
      </div>
      <div className="flex justify-center items-center py-2 bg-blue-500 gap-x-2 min-h-screen flex-wrap mx-auto">
        {tasks.map((obj, index) => {
          return <CardDemo key={index} data={obj} removeTask={removeTask} updateTask={updateTask}/>;
        })}
      </div>
    </div>
  );
};

export default withAuth(Page);
