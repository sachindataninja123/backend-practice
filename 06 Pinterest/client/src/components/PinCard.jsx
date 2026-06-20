import React from "react";
import { Link } from "react-router-dom";

const PinCard = ({ post }) => {
  return (
    <Link to={`/post/${post._id}`}>
      <div className="rounded-xl mb-2 overflow-hidden shadow">
        <img
          src={`http://localhost:8000/uploads/${post.image}`}
          alt={post.title}
          className="w-full"
        />

        <div className="p-3">
          <h3 className="font-semibold">{post.title}</h3>
        </div>
      </div>
    </Link>
  );
};

export default PinCard;
