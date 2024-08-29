"use client";
import react, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import withAuth from "@/components/withAuth";
import Image from "next/image";
import Link from "next/link";
import {
  File,
  Home,
  LineChart,
  ListFilter,
  MoreHorizontal,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  Users2,
} from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";

import BASE_URL from "@/utils/config";

const Dashboard = () => {
  const role = JSON.parse(localStorage.getItem("user")).role;
  const [data, setDATA] = useState();
  const router =  useRouter()
  const getAllLogs = async () => {
    try {
      const resp = await fetch(`${BASE_URL}/get?role=${role}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (resp.ok) {
        const timeLogs = await resp.json();
        setDATA(timeLogs.data);
        console.log(timeLogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllLogs();
  }, []);

  const handleLogout = async () => {
    try {
      const id =  JSON.parse(localStorage.getItem("user"))._id
      const res = await fetch(`${BASE_URL}/auth/logout/${id}`, {
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
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="#">Admin</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <Button onClick={handleLogout}>signout</Button>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <div className="flex items-center"></div>
            <TabsContent value="all">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>All Employees</CardTitle>
                  <CardDescription>
                    Manage your Employees and view their site engaging time
                    performance.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Login-Time</TableHead>
                        <TableHead>Update-Time</TableHead>
                        <TableHead className="hidden md:table-cell">
                          userIds
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Created at
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data ? (
                        data.map((obj, index) => {
                          return (
                            <TableRow key={index}>
                              <TableCell className="font-medium">
                                {obj.loginTime}
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                {obj.updatedAt}
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                {obj.userId}
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                {obj.createdAt}
                              </TableCell>
                              <TableCell>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      aria-haspopup="true"
                                      size="icon"
                                      variant="ghost"
                                    >
                                      <MoreHorizontal className="h-4 w-4" />
                                      <span className="sr-only">
                                        Toggle menu
                                      </span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>Delete</DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          );
                        })
                      ) : (
                        <div>no employee</div>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                    products
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default withAuth(Dashboard);
