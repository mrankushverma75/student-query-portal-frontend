"use client";

import React, { useState } from "react";
import Input from "@/components/Input";
import Link from "next/link";
import { useRegisterAuth } from "@/hooks/useAuth";
import Button from "@/components/Button";
import { toast } from "react-toastify";

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    role: "",
  });

  const { mutate, isLoading, isError, error } = useRegisterAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password || !formData.name) {
      toast.error("Please fill all fields!");

      return;
    }

    mutate(formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md py-8 px-4 sm:px-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Signup</h2>
        <form onSubmit={handleSubmit} className="mt-6">
          {/* Name Field */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Name
            </label>
            <Input
              placeholder="Enter your full name"
              type="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              maxWidth="w-full"
            />
          </div>

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
              Create Password
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

          {/* Role Field */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Role
            </label>
            <select
              name="role"
              onChange={handleChange}
              className="w-full border border-gray-300 h-12 rounded"
            >
              <option value="Student">Student</option>
              <option value="Resolver">Resolver</option>
            </select>
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            width="w-full"
            name={isLoading ? "Loading..." : "Signup"}
            disabled={isLoading}
          />
          {isError && (
            <p className="text-red-600 text-sm py-2">
              {(error as Error).message}
            </p>
          )}
        </form>

        <p className="text-center my-5">or</p>
        <Link
          href="/login"
          className="text-blue-600 underline underline-offset-2"
        >
          Already Have an Account?
        </Link>
      </div>
    </div>
  );
};

export default Signup;
