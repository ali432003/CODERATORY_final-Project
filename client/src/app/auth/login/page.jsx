"use client";

import Link from "next/link";
import React, { useState } from "react";
import "../styles.css";
import { useRouter } from "next/navigation";
import BASE_URL from "../../../utils/config.js";
import { Button } from "@/components/ui/button";

const page = () => {
  const router = useRouter();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        body: JSON.stringify(userData),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        const text = await res.text(); // Get the raw response text for debugging
        console.log("Response Text:", text);

        const data = JSON.parse(text); // Parse the JSON manually
        console.log("Parsed Data:", data.data);

        if (data) {
          // Store user data (could use sessionStorage, localStorage, or a global state)
          localStorage.setItem("user", JSON.stringify(data.data));
          localStorage.setItem("token", data.token);
          if (data.data.role === "Admin") {
            router.push("/admin");
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
      console.error("Error during login:", error);
      setError("An unexpected error occurred");
    }
  };

  return (
    <div className="Login">
      <div className="vectorBg"></div>
      <form className="loginForm" onSubmit={(e) => handleLogin(e)}>
        <h2>Login</h2>
        <input
          type="text"
          name="email"
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
          placeholder="Password"
        />
        <Button type="submit" className="loginBtn btn text-white">
          Login
        </Button>
        {error && <p>{error}</p>}
      </form>

      <div className="registerForm">
        <p style={{ marginBottom: "50px" }} htmlFor="">
          Don't have account yet?{" "}
          <Link href="/auth/signup">
            <span className="text-purple-600">Sign up</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default page;
