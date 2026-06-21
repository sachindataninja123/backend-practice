import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineDeleteOutline } from "react-icons/md";


const PinCard = ({ post }) => {
  return (
    <div className="rounded-xl mb-2 overflow-hidden shadow">
      <Link to={`/post/${post._id}`}>
        <img
          src={`http://localhost:8000/uploads/${post.image}`}
          alt={post.title}
          className="w-full"
        />
      </Link>
      <div className="p-3">
        <h3 className="font-semibold">{post.title}</h3>

      </div>
    </div>
  );
};

export default PinCard;
