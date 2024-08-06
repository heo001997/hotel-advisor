import { useState } from 'react'
import './App.css'
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/shadcnui/components/ui/card.tsx";
import {Label} from "@/shadcnui/components/ui/label.tsx";
import {Input} from "@/shadcnui/components/ui/input.tsx";
import {Button} from "@/shadcnui/components/ui/button.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/shadcnui/components/ui/select.tsx";
import {Navbar} from "@/components/NavBar.tsx";
import {Hero} from "@/components/Hero.tsx";
import {Footer} from "@/components/Footer.tsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
      <main className="h-[60vh]">
        <Hero />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  )
}

export default App
