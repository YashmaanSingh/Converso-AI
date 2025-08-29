"use client";


import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [form, setForm] = useState({ name: "", email: "", userid: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Signup failed");
      setSuccess("Signup successful! Redirecting to profile...");
      setForm({ name: "", email: "", userid: "", password: "" });
      setTimeout(() => {
        router.push("/addprofile");
      }, 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
      <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-xl w-full max-w-2xl flex flex-row animate-fade-in overflow-hidden">
        {/* Info Section */}
        <div className="flex flex-col justify-center items-center w-1/2 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-8 gap-6 text-white">
          <h1 className="text-3xl font-extrabold text-center mb-2 drop-shadow-lg">Create Account</h1>
          <p className="text-white/80 text-center mb-4">Join the messenger portfolio and unlock all features!</p>
          <div className="flex flex-col gap-4 text-white/90 text-base w-full">
            <div className="flex items-center gap-2">
              <span className="text-xl">🌍</span>
              <span>22+ Languages</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🔊</span>
              <span>Voice Messages</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl">⚡</span>
              <span>Real-time Translation</span>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="flex flex-col justify-center items-center w-1/2 bg-white/10 p-8 gap-6">
          <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="px-4 py-3 rounded-lg bg-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
              required
              aria-label="Name"
              value={form.name}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="px-4 py-3 rounded-lg bg-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
              required
              aria-label="Email"
              value={form.email}
              onChange={handleChange}
            />
            <input
              type="text"
              name="userid"
              placeholder="User ID"
              className="px-4 py-3 rounded-lg bg-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
              required
              aria-label="User ID"
              value={form.userid}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="px-4 py-3 rounded-lg bg-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
              required
              aria-label="Password"
              value={form.password}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="mt-2 py-3 rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
            {error && <div className="text-red-400 text-center mt-2">{error}</div>}
            {success && <div className="text-green-400 text-center mt-2">{success}</div>}
          </form>
          <div className="text-center mt-4 w-full">
            <a href="/login" className="text-white/80 hover:text-white underline transition-colors duration-200">
              Already have an account? Log in
            </a>
          </div>
        </div>
      </div>

      {/* Inline animation using Tailwind CSS */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
