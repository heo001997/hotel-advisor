import { useState } from 'react'
import './App.css'
import {Navbar} from "@/components/NavBar.tsx";
import {Hero} from "@/components/Hero.tsx";
import {Footer} from "@/components/Footer.tsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
      <Hero />
      <Footer />
    </>
  )
}

export default App
