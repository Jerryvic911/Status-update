import React from "react";

const Banner = () => {
  return (
    <section className="py-16 px-6 bg-gradient-to-br text-white text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-md">
        Ready to Share Your Voice?
      </h2>
      <p className="text-lg mb-6 drop-shadow-sm">
        Join now and be part of a minimal, expressive, and welcoming space.
      </p>
      <button className="px-8 py-3 bg-white text-[#ff1b6b] font-semibold rounded-full shadow hover:bg-pink-100 transition">
        Create Your First Post
      </button>
    </section>
  );
};

export default Banner;
