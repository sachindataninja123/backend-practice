import React from "react";

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
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white border-b px-6 py-3 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-red-600">Pinterest</h1>

        <input
          type="text"
          placeholder="Search pins..."
          className="w-1/2 bg-gray-100 rounded-full px-5 py-2 outline-none"
        />

        <div className="w-10 h-10 rounded-full bg-gray-300"></div>
      </nav>

      {/* Feed */}
      <div className="p-4 columns-2 md:columns-3 lg:columns-5 gap-4">
        {pins.map((pin) => (
          <div key={pin.id} className="mb-4 break-inside-avoid cursor-pointer">
            <div className="overflow-hidden rounded-2xl">
              <img
                src={pin.image}
                alt={pin.title}
                className="w-full rounded-2xl hover:scale-105 transition duration-300"
              />
            </div>

            <h3 className="mt-2 font-semibold px-1">{pin.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
