import React from 'react'

const About = () => {
  return (
    <section className="py-20 bg-white dark:bg-[#0f0f0f] text-gray-800 dark:text-white">
    <div className="max-w-5xl mx-auto px-6 text-center">
      <h2 className="text-4xl font-bold mb-6">What We Offer</h2>
      <p className="text-lg mb-12 max-w-2xl mx-auto">
        A space to freely share your thoughts. No noise, no comments—just pure text and real connections through likes.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 rounded-xl bg-gray-100 dark:bg-white/5 backdrop-blur shadow">
          <h3 className="text-xl font-semibold mb-2">📣 Post Freely</h3>
          <p>Share short text posts without judgment or interruptions.</p>
        </div>

        <div className="p-6 rounded-xl bg-gray-100 dark:bg-white/5 backdrop-blur shadow">
          <h3 className="text-xl font-semibold mb-2">❤️ Simple Likes</h3>
          <p>Receive appreciation through likes—no comments, no spam.</p>
        </div>

        <div className="p-6 rounded-xl bg-gray-100 dark:bg-white/5 backdrop-blur shadow">
          <h3 className="text-xl font-semibold mb-2">📱 Minimal UI</h3>
          <p>Clean and responsive interface that feels easy and fast.</p>
        </div>
      </div>
    </div>
  </section>
  )
}

export default About
