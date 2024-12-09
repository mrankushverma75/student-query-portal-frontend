"use client";

import React, { useState } from "react";
import Input from "@/components/Input";
import Link from "next/link";
import Button from "@/components/Button";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks/useAuth";

const Login: React.FC = () => {
  const { mutate, isLoading, isError, error } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Please fill email and password!");
      return;
    }

    mutate(formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md py-8 px-4 sm:px-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
        <form onSubmit={handleSubmit} className="mt-6">
          {/* Email Field */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email Address
            </label>
            <Input
              placeholder="Enter your email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              maxWidth="w-full"
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <Input
              placeholder="Enter your password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              maxWidth="w-full"
            />
          </div>
          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            width="w-full"
            name={isLoading ? "Logging in..." : "Login"}
            disabled={isLoading}
          />
          {isError && (
            <p className="text-red-600 text-sm py-2">
              {(error as any)?.response?.data?.error || "An error occurred"}
            </p>
          )}
        </form>

        <p className="text-center my-5">or</p>
        <Link
          href="/signup"
          className="text-blue-600 underline underline-offset-2"
        >
          Create Account?
        </Link>
      </div>
    </div>
  );
};

export default Login;
