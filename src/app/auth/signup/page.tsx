"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Coffee } from "lucide-react";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // For demo purposes, we'll store in localStorage
    // In a real app, this would be handled by the backend
    const users = JSON.parse(localStorage.getItem("demo_users") || "[]");
    const existingUser = users.find((user: any) => user.email === email);

    if (existingUser) {
      setError("User already exists");
      return;
    }

    // Add new user
    users.push({ name, email, password });
    localStorage.setItem("demo_users", JSON.stringify(users));

    // Auto sign in after registration
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Registration successful but sign in failed");
    } else {
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen bg-coffee-dark flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="bg-gold-accent p-3 rounded-full w-fit mx-auto mb-4">
            <Coffee size={32} className="text-coffee-dark" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-coffee-dark">
            Join BrewHouse
          </h1>
          <p className="text-coffee-cream mt-2">Create your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-coffee-dark"
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gold-accent focus:border-gold-accent"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-coffee-dark"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gold-accent focus:border-gold-accent"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-coffee-dark"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gold-accent focus:border-gold-accent"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-coffee-dark"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gold-accent focus:border-gold-accent"
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}

          <button
            type="submit"
            className="w-full bg-gold-accent hover:bg-gold-light text-coffee-dark font-bold py-2 px-4 rounded-md transition-colors"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-coffee-cream">
            Already have an account?{" "}
            <Link
              href="/auth/signin"
              className="text-gold-accent hover:text-gold-light font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>

        <div className="mt-4 text-center">
          <Link
            href="/"
            className="text-sm text-coffee-cream hover:text-gold-accent"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
