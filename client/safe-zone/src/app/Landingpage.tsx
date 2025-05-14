"use client"
import Navbar from "./components/Navbar"
import Hero from "./sections/Hero"
import About from "./sections/About"
import Preview from "./sections/Preview"
import Banner from "./sections/Banner"
import Footer from "./components/Footer"

const Landingpage = () => {
  return (
    <div className="min-h-screen text-black" style={{ background: "linear-gradient(135deg, #40c9ff, #e81cff)" }}>
      <div>
        <Navbar />
      </div>

      <div id="hero">
        <Hero />
      </div>

      <div id="about">
        <About />
      </div>

      <div id="preview">
        <Preview />
      </div>

      <div>
        <Banner />
      </div>
<div id="footer">
  
      <Footer />
</div>
    </div>
  )
}

export default Landingpage
