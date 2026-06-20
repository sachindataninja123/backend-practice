import React from "react";

const PinCard = ({ post }) => {
  return (
    <div className="rounded-xl overflow-hidden shadow">
      <img
        src={`http://localhost:8000/uploads/${post.image}`}
        alt={post.title}
        className="w-full"
      />

      <div className="p-3">
        <h3 className="font-semibold">{post.title}</h3>
      </div>
    </div>
  );
};

export default PinCard;
