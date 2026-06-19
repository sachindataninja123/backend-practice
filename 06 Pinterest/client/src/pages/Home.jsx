import React from "react";
import PinCard from "../components/PinCard";
import Navbar from "../components/Navbar";

const pins = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500",
    title: "Nature",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1494526585095-c41746248156?w=500",
    title: "House Design",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500",
    title: "Portrait",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500",
    title: "Technology",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500",
    title: "Workspace",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=500",
    title: "Travel",
  },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Feed */}
      <div className="p-4 columns-2 md:columns-3 lg:columns-5 gap-4">
        {pins.map((pin) => (
          <div key={pin.id} className="mb-4 break-inside-avoid cursor-pointer">
            <PinCard pin={pin} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
