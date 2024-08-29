"use client";

import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import BASE_URL from "@/utils/config";
import useSocketActivity from "@/hooks/UserSocketActivity";

export function CardWithForm({ addTask }) {
  const id = JSON.parse(localStorage.getItem("user"))._id
  useSocketActivity(id)
  const [data, setData] = useState({
    title: "",
    description: "",
    userId: id,
  });
  const [error, setError] = useState("");

  const handleSumbit = async (e) => {
    e.preventDefault();
    console.log(data);
    try {
      const res = await fetch(`${BASE_URL}/employee/createtask`, {
        method: "POST",
        body: JSON.stringify(data),
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
        addTask(data.data)
        if (data) {
          console.log(data.data);
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
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create Tasks</CardTitle>
        <CardDescription>Deploy your new task in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">title</Label>
              <Input
                id="name"
                onChange={(e) => setData({ ...data, title: e.target.value })}
                placeholder="Enter Title"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Description</Label>
              <Input
                onChange={(e) =>
                  setData({ ...data, description: e.target.value })
                }
                id="name"
                placeholder="Enter Description"
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button onClick={handleSumbit}>Submit</Button>
      </CardFooter>
    </Card>
  );
}
