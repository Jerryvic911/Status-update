import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#111827] text-gray-300 py-10 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Logo / Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white">TextSpace</h2>
          <p className="mt-2 text-sm text-gray-400">A minimal place for meaningful words.</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-white">Quick Links</h3>
          <ul className="space-y-1">
            <li><a href="#home" className="hover:text-white transition">Home</a></li>
            <li><a href="#about" className="hover:text-white transition">About</a></li>
            <li><a href="#preview" className="hover:text-white transition">Preview</a></li>
            <li><a href="#cta" className="hover:text-white transition">Join Now</a></li>
          </ul>
        </div>

        {/* Contact or Socials */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-white">Stay Connected</h3>
          <p className="text-sm">Follow us or reach out anytime.</p>
          <div className="flex justify-center md:justify-start gap-4 mt-3">
            <a href="https://x.com/Jeremia14045365" className="hover:text-white transition">Twitter</a>
            <a href="https://github.com/Jerryvic911" className="hover:text-white transition">GitHub</a>
            <a href="Jeremiahv791@gmail.com" className="hover:text-white transition">Email</a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="text-center mt-10 text-sm text-gray-500">
        © {new Date().getFullYear()} TextSpace. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
