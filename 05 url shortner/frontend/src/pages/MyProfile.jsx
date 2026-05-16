import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { IoCopyOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
  const [urls, setUrls] = useState([]);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const getallUrls = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/url/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setUrls(res.data.url);
      setUser(res.data.user);
    } catch (error) {
      console.log("fetching urls error", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    getallUrls();
  }, []);

  const deleteHandler = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/url/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      // remove deleted url from ui
      setUrls((prev) => prev.filter((url) => url._id !== id));
    } catch (error) {
      console.log("error in delete url", error.response?.data || error.message);
    }
  };

  const logoutHandler = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/users/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.log("error in delete url", error.response?.data || error.message);
    }
  };

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url);
    alert("Copied to clipboard!");
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-2xl text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between px-6 md:px-16 py-10 gap-5">
        <div>
          <h1 className="text-4xl font-bold">My Profile</h1>

          <p className="text-slate-400 mt-2">Manage your shortened URLs</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl px-5 py-4 shadow-lg flex items-start justify-between">
          <div>
            <h4 className="text-white capitalize text-2xl font-semibold">
              {user?.name}
            </h4>

            <p className="text-slate-400 mt-1">{user?.email}</p>
          </div>
          <button
            onClick={logoutHandler}
            className=" text-red-500 cursor-pointer"
          >
            <IoIosLogOut size={30} />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 md:px-16">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
          <h2 className="text-slate-400 text-lg">Total URLs</h2>

          <p className="text-4xl font-bold text-sky-400 mt-3">{urls.length}</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
          <h2 className="text-slate-400 text-lg">Total Clicks</h2>

          <p className="text-4xl font-bold text-green-400 mt-3">
            {urls.reduce((acc, item) => acc + item.clicks, 0)}
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
          <h2 className="text-slate-400 text-lg">Active Links</h2>

          <p className="text-4xl font-bold text-purple-400 mt-3">
            {urls.length}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="px-4 md:px-16 py-10">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
          {/* Table Header */}
          <div className="hidden md:grid grid-cols-12 bg-slate-800 px-6 py-4 font-semibold text-slate-300">
            <div className="col-span-5">Original URL</div>

            <div className="col-span-3">Short URL</div>

            <div className="col-span-2 text-center">Clicks</div>

            <div className="col-span-2 text-center">Actions</div>
          </div>

          {/* Body */}
          {urls?.map((url) => (
            <div
              key={url._id}
              className="border-t border-slate-800 p-5 md:grid md:grid-cols-12 md:items-center hover:bg-slate-800/40 transition"
            >
              {/* Mobile Layout */}
              <div className="md:hidden space-y-4">
                {/* Original URL */}
                <div>
                  <p className="text-slate-400 text-sm mb-1">Original URL</p>

                  <p className="text-slate-300 break-all">{url.originalUrl}</p>
                </div>

                {/* Short URL */}
                <div>
                  <p className="text-slate-400 text-sm mb-1">Short URL</p>

                  <a
                    href={`http://localhost:8000/api/url/${url.shortUrl}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sky-400 break-all hover:underline"
                  >
                    {`http://localhost:8000/api/url/${url.shortUrl}`}
                  </a>
                </div>

                {/* Clicks */}
                <div>
                  <p className="text-slate-400 text-sm mb-1">Clicks</p>

                  <p className="text-green-400 font-semibold">{url.clicks}</p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-2">
                  {/* Copy */}
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `http://localhost:8000/api/url/${url.shortUrl}`,
                      )
                    }
                    className="border border-sky-500 hover:bg-sky-600 transition px-3 py-3 rounded-xl"
                  >
                    <IoCopyOutline size={20} />
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => deleteHandler(url._id)}
                    className="border border-red-500 hover:bg-red-600 transition px-3 py-3 rounded-xl"
                  >
                    <MdDeleteOutline size={20} />
                  </button>
                </div>
              </div>

              {/* Desktop Layout */}
              <>
                {/* Original URL */}
                <div className="hidden md:block col-span-5 truncate text-slate-300">
                  {url.originalUrl}
                </div>

                {/* Short URL */}
                <div className="hidden md:block col-span-3">
                  <a
                    href={`http://localhost:8000/api/url/${url.shortUrl}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sky-400 hover:underline truncate"
                  >
                    {`http://localhost:8000/api/url/${url.shortUrl}`}
                  </a>
                </div>

                {/* Clicks */}
                <div className="hidden md:block col-span-2 text-center text-green-400 font-semibold">
                  {url.clicks}
                </div>

                {/* Actions */}
                <div className="hidden md:flex col-span-2 items-center justify-center gap-3">
                  {/* Copy */}
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `http://localhost:8000/api/url/${url.shortUrl}`,
                      )
                    }
                    className="border border-sky-500 hover:bg-sky-600 transition px-3 py-3 rounded-xl"
                  >
                    <IoCopyOutline size={20} />
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => deleteHandler(url._id)}
                    className="border border-red-500 hover:bg-red-600 transition px-3 py-3 rounded-xl"
                  >
                    <MdDeleteOutline size={20} />
                  </button>
                </div>
              </>
            </div>
          ))}

          {/* Empty State */}
          {urls?.length === 0 && (
            <div className="text-center py-16 text-slate-400">
              No URLs found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
