import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className=" bg-[#0f172a] text-white overflow-hidden">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-14 items-center">
          {/* Left Content */}
          <div>
            <p className="text-[#38bdf8] font-semibold mb-4 tracking-wide">
              SMART NOTES APP
            </p>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Write Notes
              <span className="text-[#38bdf8]"> Faster</span>,
              <br />
              Stay Organized
            </h1>

            <p className="text-gray-400 text-lg mt-6 leading-relaxed">
              A modern notes application to create, manage, and organize your
              thoughts beautifully with a clean and minimal interface.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                to="/create-note"
                className="bg-[#38bdf8] hover:bg-[#0ea5e9] text-black font-semibold px-7 py-3 rounded-2xl transition duration-300 shadow-lg"
              >
                Create Note
              </Link>

              <Link
                to="/"
                className="border border-gray-700 hover:border-[#38bdf8] hover:text-[#38bdf8] px-7 py-3 rounded-2xl transition duration-300"
              >
                Explore Notes
              </Link>
            </div>
          </div>

          {/* Right UI Card */}
          <div className="relative">
            <div className="absolute inset-0 bg-[#38bdf8]/20 blur-3xl rounded-full"></div>

            <div
              className="relative bg-[#1e293b] border border-gray-800 
backdrop-blur-xl 
shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_0_30px_rgba(255,255,255,0.04)] 
hover:border-gray-600 
hover:shadow-[0_0_40px_rgba(255,255,255,0.08)] 
transition-all duration-300  rounded-3xl p-8 "
            >
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              </div>

              <div className="space-y-4">
                <div className="bg-[#0f172a] p-4 rounded-2xl">
                  <h3 className="font-semibold text-[#38bdf8]">
                    Project Ideas
                  </h3>
                  <p className="text-gray-400 text-sm mt-2">
                    Build a full-stack notes app using MERN stack.
                  </p>
                </div>

                <div className="bg-[#0f172a] p-4 rounded-2xl">
                  <h3 className="font-semibold text-[#38bdf8]">Daily Tasks</h3>
                  <p className="text-gray-400 text-sm mt-2">
                    Complete backend authentication APIs.
                  </p>
                </div>

                <div className="bg-[#0f172a] p-4 rounded-2xl">
                  <h3 className="font-semibold text-[#38bdf8]">
                    Learning Goals
                  </h3>
                  <p className="text-gray-400 text-sm mt-2">
                    Learn MongoDB relationships and JWT auth.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-3 gap-8">
          <div
            className="bg-[#1e293b] border border-gray-800 
backdrop-blur-xl 
shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_0_30px_rgba(255,255,255,0.04)] 
hover:border-gray-600 
hover:shadow-[0_0_40px_rgba(255,255,255,0.08)] 
transition-all duration-300  rounded-3xl p-8"
          >
            <div className="text-4xl mb-4">⚡</div>

            <h2 className="text-2xl font-bold mb-3">Fast Experience</h2>

            <p className="text-gray-400 leading-relaxed">
              Create and manage notes instantly with a blazing-fast UI.
            </p>
          </div>

          <div
            className="bg-[#1e293b] border border-gray-800 
backdrop-blur-xl 
shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_0_30px_rgba(255,255,255,0.04)] 
hover:border-gray-600 
hover:shadow-[0_0_40px_rgba(255,255,255,0.08)] 
transition-all duration-300  rounded-3xl p-8"
          >
            <div className="text-4xl mb-4">🎨</div>

            <h2 className="text-2xl font-bold mb-3">Beautiful Design</h2>

            <p className="text-gray-400 leading-relaxed">
              Modern dark theme with elegant colors and clean layouts.
            </p>
          </div>

          <div
            className="bg-[#1e293b] border border-gray-800 
backdrop-blur-xl 
shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_0_30px_rgba(255,255,255,0.04)] 
hover:border-gray-600 
hover:shadow-[0_0_40px_rgba(255,255,255,0.08)] 
transition-all duration-300  rounded-3xl p-8"
          >
            <div className="text-4xl mb-4">🔒</div>

            <h2 className="text-2xl font-bold mb-3">Secure Notes</h2>

            <p className="text-gray-400 leading-relaxed">
              Keep your notes safe and organized with structured storage.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
