import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState } from "react";
import axios from "axios";

const Home = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState([]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8000/api/url/shorten",
        {
          originalUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      setShortUrl(res.data.shortUrl);
      setOriginalUrl("");
    } catch (error) {
      console.log("shorten url error", error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-24 md:py-32">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Shorten Your <span className="text-sky-400">Long URLs</span>
          </h1>

          <p className="mt-6 text-slate-300 text-lg md:text-xl leading-8">
            Create clean, short and shareable links instantly. Manage your URLs,
            track clicks and build better sharing experiences.
          </p>
        </div>

        {/* URL Box */}
        <div className="w-full flex items-center justify-center">
          <form
            onSubmit={(e) => submitHandler(e)}
            action=""
            className="w-full max-w-3xl mt-12 bg-gray-200 rounded-2xl p-3 shadow-2xl flex flex-col md:flex-row gap-3"
          >
            <input
              type="text"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              placeholder="Paste your long URL here..."
              className="flex-1 px-5 py-4 rounded-xl outline-none text-black text-lg"
            />

            <button
              type="submit"
              className="bg-sky-500 cursor-pointer hover:bg-sky-600 transition text-white px-8 py-4 rounded-xl font-semibold text-lg"
            >
              Shorten URL
            </button>
          </form>
        </div>

        {/* short Url */}
        {shortUrl && (
          <div className="mt-8 bg-slate-900 border border-slate-800 px-6 py-4 rounded-2xl">
            <p className="text-slate-400 mb-2">Your Short URL</p>

            <a
              href={shortUrl}
              target="_blank"
              rel="noreferrer"
              className="text-sky-400 text-lg hover:underline"
            >
              {shortUrl}
            </a>
          </div>
        )}
      </section>

      {/* Features */}
      <section
        id="features"
        className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 md:px-16 pb-20"
      >
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:-translate-y-2 transition duration-300 shadow-xl">
          <div className="text-4xl mb-5">⚡</div>

          <h2 className="text-2xl font-semibold text-sky-400 mb-4">
            Fast Shortening
          </h2>

          <p className="text-slate-300 leading-7">
            Generate short URLs instantly with your backend API and share them
            anywhere.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:-translate-y-2 transition duration-300 shadow-xl">
          <div className="text-4xl mb-5">📊</div>

          <h2 className="text-2xl font-semibold text-sky-400 mb-4">
            Track Clicks
          </h2>

          <p className="text-slate-300 leading-7">
            Monitor how many users clicked your links with built-in analytics.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:-translate-y-2 transition duration-300 shadow-xl">
          <div className="text-4xl mb-5">🔒</div>

          <h2 className="text-2xl font-semibold text-sky-400 mb-4">
            Secure & Reliable
          </h2>

          <p className="text-slate-300 leading-7">
            Keep your URLs safe with authentication and protected APIs.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
