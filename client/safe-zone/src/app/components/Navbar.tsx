
const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/30 backdrop-blur-lg border-b border-white/40 shadow-lg">
    <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-white">Safe-zone</h1>
      <ul className="flex gap-6 text-white">
        <li className="hover:text-blue-300 cursor-pointer">Home</li>
        <li className="hover:text-blue-300 cursor-pointer">About</li>
        <li className="hover:text-blue-300 cursor-pointer">Contact</li>
        <li className="hover:text-blue-300 cursor-pointer">login</li>
        <li className="hover:text-blue-300 cursor-pointer">Sign-up</li>
      </ul>
    </div>
  </nav>
  );
};

export default Navbar;
