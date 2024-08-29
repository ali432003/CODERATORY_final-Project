"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import BASE_URL from "@/utils/config";
import useSocketActivity from "@/hooks/UserSocketActivity";

export default function DialogDemo({ taskId, updateTask }) {
  const userId = JSON.parse(localStorage.getItem("user"))._id;

  useSocketActivity(userId);
  const [data, setData] = useState({
    title: "",
    description: "",
  });
  // State to manage dialog open/close status
  const [isOpen, setIsOpen] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!taskId) {
      console.log("No task ID provided");
      return;
    }

    try {
      const resp = await fetch(`${BASE_URL}/employee/updatetask/${taskId}`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (resp.ok) {
        const update = await resp.json();
        console.log("Update successful", update);
        setIsOpen(false);
        updateTask(update.data);
      } else {
        console.log("Failed to update task", resp.statusText);
      }
    } catch (error) {
      console.log("Error updating task:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-slate-900 hover:bg-slate-700"
          style={{ color: "white" }}
        >
          Edit Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogDescription>
            Make changes to your task here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              defaultValue={data.title}
              className="col-span-3"
              onChange={(e) => setData({ ...data, title: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              defaultValue={data.description}
              className="col-span-3"
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={(e) => handleUpdate(e)}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
