import { useState } from 'react'
import './App.css'
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/shadcnui/components/ui/card.tsx";
import {Label} from "@/shadcnui/components/ui/label.tsx";
import {Input} from "@/shadcnui/components/ui/input.tsx";
import {Button} from "@/shadcnui/components/ui/button.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/shadcnui/components/ui/select.tsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <div className="h1 text-3xl"> Hello world! - Tailwind CSS supported </div>
      <Card className="m-auto w-[350px]">
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>Deploy your new project in one-click.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label className="self-start" htmlFor="name">Name</Label>
                <Input id="name" placeholder="Name of your project" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label className="self-start" htmlFor="framework">Framework</Label>
                <Select>
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="next">Next.js</SelectItem>
                    <SelectItem value="sveltekit">SvelteKit</SelectItem>
                    <SelectItem value="astro">Astro</SelectItem>
                    <SelectItem value="nuxt">Nuxt.js</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Deploy</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default App
