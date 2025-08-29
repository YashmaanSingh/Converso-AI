
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function AddProfilePage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    // Simulate profile save (replace with actual API call if needed)
    setTimeout(() => {
      setSuccess("Profile saved! Redirecting to chat...");
      setLoading(false);
      setTimeout(() => {
        router.push("/chat");
      }, 1200);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
      <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-xl p-8 w-full max-w-lg animate-fade-in">
        <h1 className="text-3xl font-extrabold text-white text-center mb-4 drop-shadow-lg">Create Your Messenger Profile</h1>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          {/* Profile Photo Upload */}
          <div className="flex flex-col items-center gap-2">
            <label htmlFor="profilePhoto" className="text-white/80 font-semibold">Profile Photo</label>
            <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center overflow-hidden mb-2 border-2 border-white/30">
              {/* Placeholder for preview, can be replaced with actual preview logic */}
              <svg className="w-12 h-12 text-white/60" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v4m0 0a4 4 0 100 8 4 4 0 000-8zm0 0V4m0 4v4m0 4v4" />
              </svg>
            </div>
            <input
              type="file"
              id="profilePhoto"
              accept="image/*"
              className="block w-full text-sm text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-purple-500 focus:outline-none"
              aria-label="Profile Photo"
            />
          </div>
          <input
            type="text"
            placeholder="Full Name"
            className="px-4 py-3 rounded-lg bg-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
            required
            aria-label="Full Name"
          />
          <input
            type="email"
            placeholder="Email"
            className="px-4 py-3 rounded-lg bg-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
            required
            aria-label="Email"
          />
          <input
            type="text"
            placeholder="Username"
            className="px-4 py-3 rounded-lg bg-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
            required
            aria-label="Username"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="px-4 py-3 rounded-lg bg-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
            aria-label="Phone Number"
          />
          <textarea
            placeholder="Bio (optional)"
            className="px-4 py-3 rounded-lg bg-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 resize-none"
            rows={3}
            aria-label="Bio"
          />
          <button
            type="submit"
            className="mt-2 py-3 rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Profile"}
          </button>
          {error && <div className="text-red-400 text-center mt-2">{error}</div>}
          {success && <div className="text-green-400 text-center mt-2">{success}</div>}
        </form>
      </div>
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 1s cubic-bezier(.4,0,.2,1);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
