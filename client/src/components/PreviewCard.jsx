import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BASE_URL from "@/utils/config";
import DialogDemo from "./dialog";
import useSocketActivity from "@/hooks/UserSocketActivity";

export function CardDemo({
  className,
  data,
  removeTask,
  updateTask,
  ...props
}) {
  useSocketActivity(userId)
  const userId = JSON.parse(localStorage.getItem("user")).id
  const handleDelete = async (id) => {
    try {
      const resp = await fetch(`${BASE_URL}/employee/deletetask/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (resp.ok) {
        removeTask(id); // Remove the task from the list without refreshing
      } else {
        console.log("Failed to delete task", resp.statusText);
      }
    } catch (error) {
      console.log("Error deleting task:", error);
    }
  };

  return (
    <Card className={cn("w-[380px]", className)} {...props}>
      <CardHeader>
        <CardTitle>{data.title}</CardTitle>
        <CardDescription>{data.description}</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <DialogDemo taskId={data._id} updateTask={updateTask}/>
        <Button onClick={() => handleDelete(data._id)}>Delete</Button>
      </CardFooter>
    </Card>
  );
}
