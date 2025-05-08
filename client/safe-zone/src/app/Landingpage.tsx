import React from 'react'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import Preview from './sections/Preview'
import Banner from './sections/Banner'
import Footer from './components/Footer'

const Landingpage = () => {
  return (
    <div   className="min-h-screen text-black"
    style={{ background: "linear-gradient(135deg, #40c9ff, #e81cff)" }}>
        <div>
            <Navbar/>
        </div>

        <div>
          <Hero/>
        </div>

        <div>
          <About/>
        </div>

        <div>
          <Preview/>
        </div>

        <div>
          <Banner/>
        </div>

        <Footer/>

    </div>
  )
}

export default Landingpage
