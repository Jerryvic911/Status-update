import React from "react";

const Preview = () => {
  return (
    <section className="py-16 px-6 text-white text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-6">
        Post Freely, Instantly
      </h2>
      <p className="text-lg max-w-2xl mx-auto mb-8">
        No noise. Just your words. Discover a community that values simplicity and expression.
      </p>

      <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
        <div className="bg-black p-6 rounded-xl shadow-md hover:shadow-lg transition">
          <h3 className="font-semibold text-xl mb-2">Quick Posting</h3>
          <p>Post thoughts in seconds with a clean, distraction-free interface.</p>
        </div>
        <div className="bg-black p-6 rounded-xl shadow-md hover:shadow-lg transition">
          <h3 className="font-semibold text-xl mb-2">Instant Likes</h3>
          <p>Receive real-time likes from users who vibe with your words.</p>
        </div>
        <div className="bg-black p-6 rounded-xl shadow-md hover:shadow-lg transition">
          <h3 className="font-semibold text-xl mb-2">No Comments (Yet)</h3>
          <p>Keep things peaceful with no replies — just your voice and reactions.</p>
        </div>
      </div>
    </section>
  );
};

export default Preview;
