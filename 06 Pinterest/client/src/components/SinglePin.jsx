import React, { useCallback, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { CiBookmark } from "react-icons/ci";

const SinglePin = ({
  post,
  showSave = true,
  showDelete = false,
  onSave,
  onDelete,
}) => {
  const { user } = useContext(AuthContext);

  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden">
      {post.image && (
        <img
          src={`http://localhost:8000/uploads/${post.image}`}
          alt={post.title}
          className="w-full h-112.5 object-cover"
        />
      )}

      <div className="p-6">
        <div className="p-3 flex items-center justify-between">
          <h3 className="font-semibold">{post.title}</h3>
          <div className=" flex gap-2">
            {user && showSave && (
              <button
                onClick={() => onSave(post._id)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-green-100 backdrop-blur-sm shadow-md hover:bg-green-500 cursor-pointer hover:text-white transition-all duration-200"
              >
                <CiBookmark size={22} />
              </button>
            )}

            {showDelete && (
              <button
                onClick={() => onDelete(post._id)}
                className="w-8 h-8 flex items-center justify-center rounded-full backdrop-blur-sm bg-red-100 cursor-pointer shadow-md hover:bg-red-500 hover:text-white transition-all duration-200"
              >
                <MdOutlineDeleteOutline size={22} />
              </button>
            )}
          </div>
        </div>

        <p className="text-gray-600 mb-4">
          Posted by <span className="font-semibold">{post.user?.fullname}</span>
        </p>

        <p className="text-gray-800 leading-relaxed">{post.description}</p>
      </div>
    </div>
  );
};

export default SinglePin;
