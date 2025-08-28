"use client";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
      <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-xl p-0 w-full max-w-2xl flex flex-row gap-0 animate-fade-in overflow-hidden">
        {/* Info Section */}
        <div className="flex flex-col justify-center items-center w-1/2 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-8 gap-6">
          <h1 className="text-3xl font-extrabold text-white text-center mb-2 drop-shadow-lg">Create Account</h1>
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
          <form className="flex flex-col gap-4 w-full">
            <input
              type="text"
              placeholder="Name"
              className="px-4 py-3 rounded-lg bg-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
              required
              aria-label="Name"
            />
            <input
              type="email"
              placeholder="Email"
              className="px-4 py-3 rounded-lg bg-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
              required
              aria-label="Email"
            />
            <input
              type="password"
              placeholder="Password"
              className="px-4 py-3 rounded-lg bg-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
              required
              aria-label="Password"
            />
            <button
              type="submit"
              className="mt-2 py-3 rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Sign Up
            </button>
          </form>
          <div className="text-center mt-4 w-full">
            <a href="/login" className="text-white/80 hover:text-white underline transition-colors duration-200">Already have an account? Log in</a>
          </div>
        </div>
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
