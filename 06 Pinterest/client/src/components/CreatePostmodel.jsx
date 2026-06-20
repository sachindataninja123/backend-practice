import React, { useContext, useState } from "react";
import { PostContext } from "../context/PostContext";

const CreatePostModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const { handleCreatePost } = useContext(PostContext);

  const [image, setImage] = useState(null);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("image", image);

    await handleCreatePost(data);

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-lg rounded-2xl p-6">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-bold">Create Post</h2>

          <button onClick={onClose} className="text-xl cursor-pointer">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            className="w-full border p-3 rounded-lg"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />

          <textarea
            placeholder="Description"
            className="w-full border p-3 rounded-lg"
            rows="4"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />

          <div className="w-full">
            <label
              htmlFor="imageUpload"
              className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-red-500 hover:bg-gray-50 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10 text-gray-400 mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>

              <p className="text-sm text-gray-600">Click to upload an image</p>

              <p className="text-xs text-gray-400 mt-1">PNG, JPG, JPEG</p>
            </label>

            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 text-white py-3 rounded-lg"
          >
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePostModal;
