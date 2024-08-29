"use client";

import Link from "next/link";
import React, { useState } from "react";
import "../styles.css";
import { useRouter } from "next/navigation";
import BASE_URL from "../../../utils/config.js";
import { Button } from "@/components/ui/button";

const Page = () => {
  const router = useRouter();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    username: "",
    role: "",
  });
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/auth/signup`, {
        method: "POST",
        body: JSON.stringify(userData),
        headers: { "Content-Type": "application/json" },
      });
  
      if (res.ok) {
        const text = await res.text(); // Get the raw response text for debugging
        console.log('Response Text:', text);
  
        const data = JSON.parse(text); // Parse the JSON manually
        console.log('Parsed Data:', data);
  
        if (data.user) {
          // Store user data (could use sessionStorage, localStorage, or a global state)
          localStorage.setItem("user", JSON.stringify(data.user));
          if (data.user.role === "Admin") {
            router.push("/admin/dashboard");
          } else {
            // Redirect to Employee or another page after login
            router.push("/employee");
          }
        } else {
          setError(data.message || "Login failed");
        }
      } else {
        setError("Login failed");
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError("An unexpected error occurred");
    }
  };
  

  return (
    <div className="Login">
      <div className="vectorBg"></div>
      <form className="loginForm" onSubmit={handleLogin}>
        <h2>Sign Up</h2>
        <input
          type="text"
          onChange={(e) =>
            setUserData({ ...userData, username: e.target.value })
          }
          placeholder="Your Name"
          name="name"
        />
        <input
          type="text"
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          placeholder="Email"
          name="email"
        />
        <input
          type="password"
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
          placeholder="Password"
          name="password"
        />
        <select
          onChange={(e) => setUserData({ ...userData, role: e.target.value })}
        >
          <option value="Employee">Employee</option>
          <option value="Admin">Admin</option>
        </select>
        <Button type="submit" className="loginBtn btn text-white">
          Sign Up
        </Button>
        {error && <p>{error}</p>}
      </form>

      <div className="registerForm">
        <p style={{ marginBottom: "50px" }} htmlFor="">
          Already a user?{" "}
          <Link href="/auth/login">
            <span>Login</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Page;
