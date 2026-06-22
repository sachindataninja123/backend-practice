import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { CiBookmark } from "react-icons/ci";
import { AuthContext } from "../context/AuthContext";

const PinCard = ({
  post,
  showSave = true,
  showDelete = false,
  onSave,
  onDelete,
}) => {
  const { user } = useContext(AuthContext);

  return (
    <div className="rounded-xl mb-2 overflow-hidden shadow">
      <Link to={`/post/${post._id}`}>
        <img
          src={`http://localhost:8000/uploads/${post.image}`}
          alt={post.title}
          className="w-full"
        />
      </Link>
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
    </div>
  );
};

export default PinCard;
