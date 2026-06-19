import React from "react";

const PinCard = ({pin}) => {
  return (
    <div className="rounded-xl overflow-hidden shadow">
      <img src={pin.image} alt={pin.title} className="w-full" />

      <div className="p-3">
        <h3 className="font-semibold">{pin.title}</h3>
      </div>
    </div>
  );
};

export default PinCard;
